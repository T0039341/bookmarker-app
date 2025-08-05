import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Bookmark } from '../../models/bookmarks.model';
import { BookmarksActions } from '../actions/bookmarks.actions';

// ✅ Clear, consistent key
export const bookmarksFeatureKey = 'bookmarks';

// ✅ Entity state interface
export interface State extends EntityState<Bookmark> {
  // additional state props here if needed
}

// ✅ Create the entity adapter
export const adapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

// ✅ Initial state
export const initialState: State = adapter.getInitialState({});

// ✅ Reducer with clean action names
export const reducer = createReducer(
  initialState,
  on(BookmarksActions.addBookmark, (state, { bookmark }) =>
    adapter.addOne(bookmark, state)
  ),
  on(BookmarksActions.updateBookmark, (state, { bookmark }) =>
    adapter.updateOne(bookmark, state)
  ),
  on(BookmarksActions.loadBookmarks, (state, { bookmarks }) =>
    adapter.setAll(bookmarks, state)
  )
);

// ✅ Feature definition
export const bookmarksFeature = createFeature({
  name: bookmarksFeatureKey,
  reducer,
  extraSelectors: ({ selectBookmarksState }) => ({
    ...adapter.getSelectors(selectBookmarksState),
  }),
});

// ✅ Selectors
export const { selectIds, selectEntities, selectAll, selectTotal } =
  bookmarksFeature;
