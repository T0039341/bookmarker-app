import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookmarksActions } from 'src/app/store/actions/bookmarks.actions';

@Component({
  selector: 'app-bookmarks-create',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bookmarks-create.component.html',
  styleUrl: './bookmarks-create.component.scss',
})
export class BookmarksCreateComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  form = this.fb.group({
    title: ['', Validators.required],
    url: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/)?(www\.)?[\w.-]+\.[a-zA-Z]{2,}([\/\w .-]*)*\/?$/
        ),
      ],
    ],
  });

  onSubmit() {
    if (this.form.valid) {
      const newBookmark = {
        title: this.form.value.title!,
        url: this.form.value.url!,
        createdAt: new Date().toISOString(),
      };
      this.store.dispatch(
        BookmarksActions.addBookmark({ bookmark: newBookmark })
      );
      this.router.navigate(['/']);
    }
  }
}
