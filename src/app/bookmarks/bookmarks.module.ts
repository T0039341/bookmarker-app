import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBookmarks from '../store/reducers/bookmarks.reducer';
import { BookmarksEffects } from '../store/effects/bookmarks.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature(
      fromBookmarks.bookmarksFeatureKey,
      fromBookmarks.reducer
    ),
    EffectsModule.forFeature([BookmarksEffects]),
  ],
})
export class BookmarksModule {}
