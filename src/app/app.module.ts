import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import * as fromBookmarks from './store/reducers/bookmarks.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookmarksEffects } from './store/effects/bookmarks.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    StoreModule.forFeature(fromBookmarks.bookmarksesFeatureKey, fromBookmarks.reducer),
    EffectsModule.forFeature([BookmarksEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
