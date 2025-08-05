import { TestBed } from '@angular/core/testing';

import { BookmarkGroupingService } from './bookmarks-grouping.service';

describe('BookmarksGroupingService', () => {
  let service: BookmarkGroupingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkGroupingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
