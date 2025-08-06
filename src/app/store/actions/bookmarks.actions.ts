import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Bookmark } from '../../models/bookmarks.model';

export const BookmarksActions = createActionGroup({
  source: 'Bookmarks/API',
  events: {
    'Set Filter': props<{ filter: string }>(),

    'Init Load Bookmarks': emptyProps(),

    'Load Bookmarks Success': props<{ bookmarks: Bookmark[] }>(),

    'Add Bookmark': props<{ bookmark: Omit<Bookmark, 'id'> }>(),

    'Add Bookmark Success': props<{ bookmark: Bookmark }>(),

    'Update Bookmark': props<{ bookmark: Update<Bookmark> }>(),

    'Update Bookmark Success': props<{ bookmark: Update<Bookmark> }>(),
  },
});
