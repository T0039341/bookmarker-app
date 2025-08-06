import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookmarksActions } from 'src/app/store/actions/bookmarks.actions';
import { bookmarksFeature } from 'src/app/store/reducers/bookmarks.reducer';
import { FormCardComponent } from '../../form-card/form-card.component';
import {
  Bookmark,
  BookmarkFormValue,
  FieldConfig,
} from 'src/app/models/bookmarks.model';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-bookmarks-edit',
  standalone: true,
  imports: [CommonModule, FormCardComponent],
  template: `
    <app-form-card
      [title]="'Edit Bookmark'"
      [description]="'Update bookmark details'"
      [icon]="'edit'"
      [buttonLabel]="'Update'"
      [fields]="fields"
      [initialValue]="initialValue"
      (submitted)="handleSubmit($event)"
    ></app-form-card>
  `,
  styleUrl: './bookmarks-edit.component.scss',
})
export class BookmarksEditComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  fields: FieldConfig<BookmarkFormValue>[] = [
    { name: 'title', label: 'Name', validators: [Validators.required] },
    {
      name: 'url',
      label: 'URL',
      validators: [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/)?(www\.)?[\w-]+\.[a-zA-Z]{2,}(\/.*)?$/
        ),
      ],
    },
  ];

  bookmarkId: string | null = null;
  initialValue = { title: '', url: '' };
  private originalBookmark: Bookmark | null = null;

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.bookmarkId = params.get('id');
      if (this.bookmarkId) {
        this.store
          .select(bookmarksFeature.selectEntities)
          .pipe(takeUntil(this.destroy$))
          .subscribe((entities) => {
            const bookmark = entities[this.bookmarkId!];
            if (bookmark) {
              this.originalBookmark = bookmark;
              this.initialValue = {
                title: bookmark.title,
                url: bookmark.url,
              };
            }
          });
      }
    });
  }

  handleSubmit(formValue: { title: string; url: string }) {
    if (!this.bookmarkId || !this.originalBookmark) return;
    this.store.dispatch(
      BookmarksActions.updateBookmark({
        bookmark: {
          id: this.bookmarkId!,
          changes: {
            ...formValue,
            createdAt: this.originalBookmark.createdAt,
          },
        },
      })
    );
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
