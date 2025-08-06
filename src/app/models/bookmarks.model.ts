import { ValidatorFn } from '@angular/forms';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  createdAt: string;
}

export interface GroupedBookmarks {
  today: Bookmark[];
  yesterday: Bookmark[];
  older: Bookmark[];
}

export interface BookmarkFormValue {
  title: string;
  url: string;
}

export interface FieldConfig<T> {
  name: keyof T;
  label: string;
  type?: string;
  validators?: ValidatorFn[];
}
