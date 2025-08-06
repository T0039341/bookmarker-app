import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './app/services/in-memory-data.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { bookmarksFeature } from './app/store/reducers/bookmarks.reducer';
import { BookmarksEffects } from './app/store/effects/bookmarks.effects';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),

    importProvidersFrom(
      InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 1000 })
    ),

    provideStore(),
    provideState(bookmarksFeature),
    provideEffects(BookmarksEffects),
  ],
}).catch((err) => console.error(err));
