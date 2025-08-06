import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Bookmark } from '../../../models/bookmarks.model';
import { BookmarksActions } from '../../../store/actions/bookmarks.actions';
import { bookmarksFeature } from '../../../store/reducers/bookmarks.reducer';
import { BookmarkGroupingService } from '../../../services/bookmarks-grouping.service';

@Component({
  selector: 'app-bookmarks-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './bookmarks-list.component.html',
  styleUrl: './bookmarks-list.component.scss',
  providers: [BookmarkGroupingService],
})
export class BookmarksListComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private groupingService = inject(BookmarkGroupingService);
  private destroy$ = new Subject<void>();

  public today: Bookmark[] = [];
  public yesterday: Bookmark[] = [];
  public older: Bookmark[] = [];

  ngOnInit(): void {
    this.store.dispatch(BookmarksActions.initLoadBookmarks());

    this.store
      .select(bookmarksFeature.selectFilteredBookmarks)
      .pipe(takeUntil(this.destroy$))
      .subscribe((bookmarks) => {
        const grouped = this.groupingService.groupBookmarks(bookmarks);
        this.today = grouped.today;
        this.yesterday = grouped.yesterday;
        this.older = grouped.older;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
