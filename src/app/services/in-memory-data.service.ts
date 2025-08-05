import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Bookmark } from '../models/bookmarks.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const bookmarks: Bookmark[] = [];
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
