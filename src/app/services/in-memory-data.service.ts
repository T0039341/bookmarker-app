import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Bookmark } from '../models/bookmarks.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const bookmarks: Bookmark[] = [
      {
        id: '1',
        title: 'Today Link',
        url: 'https://today.com',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Today Link',
        url: 'https://today.com',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Today Link',
        url: 'https://today.com',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Yesterday Link',
        url: 'https://yesterday.com',
        createdAt: '2025-08-04T10:00:00.000Z',
      },
      {
        id: '5',
        title: 'Old Link',
        url: 'https://older.com',
        createdAt: '2025-07-20T12:00:00.000Z',
      },
    ];

    return { bookmarks };
  }

  //generate some new ids
  genId(bookmarks: { id: string }[]): string {
    let maxId = 0;

    for (const b of bookmarks) {
      const id = Number(b.id);
      if (!isNaN(id) && id > maxId) {
        maxId = id;
      }
    }

    return (maxId + 1).toString();
  }

  constructor() {}
}
