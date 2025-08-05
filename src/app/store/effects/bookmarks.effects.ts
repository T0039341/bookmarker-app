import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { BookmarksActions } from '../actions/bookmarks.actions';
import { Bookmark } from '../../models/bookmarks.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BookmarksEffects {
  loadBookmarks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookmarksActions.initLoadBookmarks),
      switchMap(() =>
        this.http
          .get<Bookmark[]>('/api/bookmarks')
          .pipe(
            map((bookmarks) =>
              BookmarksActions.loadBookmarksSuccess({ bookmarks })
            )
          )
      )
    );
  });

  constructor(private actions$: Actions, private http: HttpClient) {}
}
