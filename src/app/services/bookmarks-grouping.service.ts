import { Injectable } from '@angular/core';
import { Bookmark, GroupedBookmarks } from '../models/bookmarks.model';

@Injectable({ providedIn: 'root' })
export class BookmarkGroupingService {
  private isSameDate(dateA: Date, dateB: Date): boolean {
    return (
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate()
    );
  }

  groupBookmarks(bookmarks: Bookmark[]): GroupedBookmarks {
    const todayList: Bookmark[] = [];
    const yesterdayList: Bookmark[] = [];
    const olderList: Bookmark[] = [];

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    for (const bookmark of bookmarks) {
      const created = new Date(bookmark.createdAt);

      if (this.isSameDate(created, today)) {
        todayList.push(bookmark);
      } else if (this.isSameDate(created, yesterday)) {
        yesterdayList.push(bookmark);
      } else {
        olderList.push(bookmark);
      }
    }

    return {
      today: todayList,
      yesterday: yesterdayList,
      older: olderList,
    };
  }
}
