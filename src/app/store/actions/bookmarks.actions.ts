import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Bookmarks } from '../models/bookmarks.model';

export const BookmarksActions = createActionGroup({
  source: 'Bookmarks/API',
  events: {
    'Load Bookmarkss': props<{ bookmarkss: Bookmarks[] }>(),
    'Add Bookmarks': props<{ bookmarks: Bookmarks }>(),
    'Upsert Bookmarks': props<{ bookmarks: Bookmarks }>(),
    'Add Bookmarkss': props<{ bookmarkss: Bookmarks[] }>(),
    'Upsert Bookmarkss': props<{ bookmarkss: Bookmarks[] }>(),
    'Update Bookmarks': props<{ bookmarks: Update<Bookmarks> }>(),
    'Update Bookmarkss': props<{ bookmarkss: Update<Bookmarks>[] }>(),
    'Delete Bookmarks': props<{ id: string }>(),
    'Delete Bookmarkss': props<{ ids: string[] }>(),
    'Clear Bookmarkss': emptyProps(),
  }
});
