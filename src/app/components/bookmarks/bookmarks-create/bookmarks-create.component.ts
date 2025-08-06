import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookmarksActions } from 'src/app/store/actions/bookmarks.actions';
import { FormCardComponent } from '../../form-card/form-card.component';
import { BookmarkFormValue, FieldConfig } from 'src/app/models/bookmarks.model';

@Component({
  selector: 'app-bookmarks-create',
  standalone: true,
  imports: [CommonModule, FormCardComponent],
  templateUrl: './bookmarks-create.component.html',
  styleUrl: './bookmarks-create.component.scss',
})
export class BookmarksCreateComponent {
  private store = inject(Store);
  private router = inject(Router);

  private urlPattern = /^(https?:\/\/)?(www\.)?[\w-]+\.[a-zA-Z]{2,}(\/.*)?$/;

  fields: FieldConfig<BookmarkFormValue>[] = [
    {
      name: 'title',
      label: 'Name',
      validators: [Validators.required],
    },
    {
      name: 'url',
      label: 'URL',
      validators: [Validators.required, Validators.pattern(this.urlPattern)],
    },
  ];

  handleSubmit(formValue: { title: string; url: string }) {
    const newBookmark = {
      ...formValue,
      createdAt: new Date().toISOString(),
    };
    this.store.dispatch(
      BookmarksActions.addBookmark({ bookmark: newBookmark })
    );
    this.router.navigate(['/']);
  }
}
