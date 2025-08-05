export interface Bookmark {
  id?: string;
  title: string;
  url: string;
  createdAt: string;
}

export interface GroupedBookmarks {
  today: Bookmark[];
  yesterday: Bookmark[];
  older: Bookmark[];
}
