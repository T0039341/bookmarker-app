import { createFeature, createReducer, on, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Bookmark } from '../../models/bookmarks.model';
import { BookmarksActions } from '../actions/bookmarks.actions';

export const bookmarksFeatureKey = 'bookmarks';

export interface State extends EntityState<Bookmark> {
  filter: string;
}

// entity adapter
export const adapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

// Initial state
export const initialState: State = adapter.getInitialState({
  filter: '',
});

// Reducer
export const reducer = createReducer(
  initialState,

  on(BookmarksActions.setFilter, (state, { filter }) => ({
    ...state,
    filter,
  })),

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
  extraSelectors: (selectors) => {
    const entitySelectors = adapter.getSelectors(
      selectors.selectBookmarksState
    );

    const selectFilter = createSelector(
      selectors.selectBookmarksState,
      (state) => state.filter
    );

    const selectFilteredBookmarks = createSelector(
      entitySelectors.selectAll,
      selectFilter,
      (bookmarks, filter) => {
        const lower = filter?.toLowerCase() ?? '';
        if (!lower) return bookmarks;
        return bookmarks.filter(
          (bm) =>
            bm.title.toLowerCase().includes(lower) ||
            bm.url.toLowerCase().includes(lower)
        );
      }
    );

    return {
      ...entitySelectors,
      selectFilter,
      selectFilteredBookmarks,
    };
  },
});

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
  selectFilter,
  selectFilteredBookmarks,
} = bookmarksFeature;
