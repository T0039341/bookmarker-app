import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Bookmark } from '../../models/bookmarks.model';

export const BookmarksActions = createActionGroup({
  source: 'Bookmarks/API',
  events: {
    'Load Bookmarks': props<{ bookmarks: Bookmark[] }>(),

    'Add Bookmark': props<{ bookmark: Bookmark }>(),

    'Update Bookmark': props<{ bookmark: Update<Bookmark> }>(),
  },
});
