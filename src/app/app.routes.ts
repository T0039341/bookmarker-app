import { Routes } from '@angular/router';
import { BookmarksListComponent } from './components/bookmarks/bookmarks-list/bookmarks-list.component';
import { BookmarksCreateComponent } from './components/bookmarks/bookmarks-create/bookmarks-create.component';
import { BookmarksEditComponent } from './components/bookmarks/bookmarks-edit/bookmarks-edit.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'bookmarks', pathMatch: 'full' },
  { path: 'bookmarks', component: BookmarksListComponent },
  { path: 'bookmarks/create', component: BookmarksCreateComponent },
  { path: 'bookmarks/edit/:id', component: BookmarksEditComponent },
];
