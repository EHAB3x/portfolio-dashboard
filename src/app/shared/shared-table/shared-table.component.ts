import { CommonModule } from '@angular/common';
import { IEducation } from './../../core/interfaces/ieducation';
import { Component, Input, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './shared-table.component.html',
  styleUrl: './shared-table.component.scss'
})
export class SharedTableComponent implements OnChanges{
  @Input() type : string = '';
  @Input() tableData !: IEducation[];
  tableRawData : IEducation[][] = [];

  columns !: string[];

  constructor(){

  }

  ngOnChanges(): void {
    if(this.tableData.length > 0){
      this.columns = Object.keys(this.tableData[0]);



      for(let i = 0; i < this.tableData.length; i++){
        // tableRawData.push()
        let tableRow = Object.values(this.tableData[i]);
        this.tableRawData.push(tableRow)
      }
    }
  }
}
