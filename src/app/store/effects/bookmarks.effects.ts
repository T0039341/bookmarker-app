import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { BookmarksActions } from '../actions/bookmarks.actions';

@Injectable()
export class BookmarksEffects {
  loadBookmarks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookmarksActions.loadBookmarks),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(private actions$: Actions) {}
}
