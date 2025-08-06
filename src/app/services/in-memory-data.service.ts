import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
  STATUS,
} from 'angular-in-memory-web-api';
import { Bookmark } from '../models/bookmarks.model';

const STORAGE_KEY = 'bookmarks_db';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const local = localStorage.getItem(STORAGE_KEY);
    let bookmarks: Bookmark[] = [];
    if (local) {
      bookmarks = JSON.parse(local);
    } else {
      bookmarks = [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    }
    return { bookmarks };
  }

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

  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'bookmarks') {
      const collection = reqInfo.collection as Bookmark[];
      const body = { ...reqInfo.utils.getJsonBody(reqInfo.req) };

      body.id = this.genId(collection);

      collection.push(body);
      return reqInfo.utils.createResponse$(() => ({
        body,
        status: 201,
        headers: reqInfo.headers,
        url: reqInfo.url,
      }));
    }
    return undefined;
  }

  put(requestInfo: RequestInfo) {
    const id = requestInfo.id;
    const updatedBookmark = requestInfo.utils.getJsonBody(requestInfo.req);
    const collection = requestInfo.collection as Bookmark[];
    const idx = collection.findIndex((b) => b.id == id);
    if (idx > -1) {
      collection[idx] = { ...collection[idx], ...updatedBookmark };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
      return requestInfo.utils.createResponse$(() => ({
        body: collection[idx],
        status: STATUS.OK,
      }));
    } else {
      return requestInfo.utils.createResponse$(() => ({
        body: {},
        status: STATUS.NOT_FOUND,
      }));
    }
  }
}
