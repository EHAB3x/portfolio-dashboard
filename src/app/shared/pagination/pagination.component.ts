import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
  @Input() totalRows!: number;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages!: number;
  pagesArr: number[] = [];
  @Output() pageChange = new EventEmitter<number>();

  constructor() {}

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.totalRows / this.pageSize);
    if (this.totalPages > 0) {
      this.updatePagesArr(this.totalPages);
    }
  }

  updatePagesArr(totalPages: number) {
    this.pagesArr = Array(totalPages)
      .fill(1)
      .map((x, i) => i + 1);
  }

  changePage(page: number): void {
    this.pageChange.emit(page);
    this.currentPage = page;
  }

  previousPage(): void {
    this.changePage(--this.currentPage);
  }

  nextPage(): void {
    this.changePage(++this.currentPage);
  }

  firstPage(): void {
    this.changePage(1);
  }

  lastPage(): void {
    this.changePage(this.totalPages);
  }
}
