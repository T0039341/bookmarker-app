import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BookmarksEffects } from './bookmarks.effects';
import { Action } from '@ngrx/store';

describe('BookmarksEffects', () => {
  let actions$: Observable<Action>;
  let effects: BookmarksEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookmarksEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(BookmarksEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
