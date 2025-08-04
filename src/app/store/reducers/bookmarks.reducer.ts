import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Bookmarks } from '../models/bookmarks.model';
import { BookmarksActions } from '../actions/bookmarks.actions';

export const bookmarksesFeatureKey = 'bookmarkses';

export interface State extends EntityState<Bookmarks> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Bookmarks> = createEntityAdapter<Bookmarks>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(BookmarksActions.addBookmarks,
    (state, action) => adapter.addOne(action.bookmarks, state)
  ),
  on(BookmarksActions.upsertBookmarks,
    (state, action) => adapter.upsertOne(action.bookmarks, state)
  ),
  on(BookmarksActions.addBookmarkss,
    (state, action) => adapter.addMany(action.bookmarkss, state)
  ),
  on(BookmarksActions.upsertBookmarkss,
    (state, action) => adapter.upsertMany(action.bookmarkss, state)
  ),
  on(BookmarksActions.updateBookmarks,
    (state, action) => adapter.updateOne(action.bookmarks, state)
  ),
  on(BookmarksActions.updateBookmarkss,
    (state, action) => adapter.updateMany(action.bookmarkss, state)
  ),
  on(BookmarksActions.deleteBookmarks,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(BookmarksActions.deleteBookmarkss,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(BookmarksActions.loadBookmarkss,
    (state, action) => adapter.setAll(action.bookmarkss, state)
  ),
  on(BookmarksActions.clearBookmarkss,
    state => adapter.removeAll(state)
  ),
);

export const bookmarksesFeature = createFeature({
  name: bookmarksesFeatureKey,
  reducer,
  extraSelectors: ({ selectBookmarksesState }) => ({
    ...adapter.getSelectors(selectBookmarksesState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = bookmarksesFeature;
