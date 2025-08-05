import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bookmarks-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatListModule],
  templateUrl: './bookmarks-list.component.html',
  styleUrl: './bookmarks-list.component.scss',
})
export class BookmarksListComponent {}
