import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Bookmark } from '../../models/bookmarks.model';
import { BookmarksActions } from '../actions/bookmarks.actions';

export const bookmarksFeatureKey = 'bookmarks';

// Entity state interface
export interface State extends EntityState<Bookmark> {}

// Create the entity adapter
export const adapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

// Initial state
export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,

  on(BookmarksActions.addBookmarkSuccess, (state, { bookmark }) =>
    adapter.addOne(bookmark, state)
  ),
  on(BookmarksActions.updateBookmark, (state, { bookmark }) =>
    adapter.updateOne(bookmark, state)
  ),
  on(BookmarksActions.loadBookmarksSuccess, (state, { bookmarks }) =>
    adapter.setAll(bookmarks, state)
  )
);

// Feature definition
export const bookmarksFeature = createFeature({
  name: bookmarksFeatureKey,
  reducer,
  extraSelectors: ({ selectBookmarksState }) => ({
    ...adapter.getSelectors(selectBookmarksState),
  }),
});

// Selectors
export const { selectIds, selectEntities, selectAll, selectTotal } =
  bookmarksFeature;
