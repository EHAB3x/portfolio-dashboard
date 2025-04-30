import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { TableOptions } from '../../core/types/TableType';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, PaginationComponent],
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss'],
})
export class SharedTableComponent implements OnInit, OnChanges {
  @Input() type: string = '';
  @Input() tableData: TableOptions[] = [];

  tableRawData: any[][] = [];
  originalTableData: TableOptions[] = [];
  columns: string[] = [];
  initialPage : number = 1;
  searchControl = new FormControl('');

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe({
      next: (searchTerm) => {
        if (!searchTerm) {
          this.restoreOriginalData();
        } else {
          this.filterData(searchTerm);
        }
      },
    });
  }

  ngOnChanges(): void {
    if (this.tableData.length > 0) {
      this.originalTableData = [...this.tableData];
      this.initializeTableData();
    }
  }

  private initializeTableData(): void {
    this.columns = Object.keys(this.tableData[0]);
    this.tableRawData = this.tableData.map(item => Object.values(item)).slice((this.initialPage - 1) * 10, this.initialPage * 10);
  }

  private restoreOriginalData(): void {
    this.tableData = [...this.originalTableData];
    this.initializeTableData();
  }

  private filterData(filterText: string): void {
    const searchTerm = filterText.toLowerCase();

    const filteredData = this.originalTableData.filter(item => {
      return Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm)
      );
    });

    this.tableData = filteredData;
    this.updateRawData(filteredData);
  }

  private updateRawData(data: TableOptions[]): void {
    this.tableRawData = data.map(item => Object.values(item));
  }

  onPagChange(page : number){
    this.initialPage = page;
    this.tableRawData = this.tableData.map(item => Object.values(item)).slice((this.initialPage - 1) * 10, this.initialPage * 10);
  }
}
