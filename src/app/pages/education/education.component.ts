import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IEducation } from '../../core/interfaces/ieducation';
import { EducationApiService } from '../../core/services/education-api.service';
import { SharedTableComponent } from "../../shared/shared-table/shared-table.component";

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [SharedTableComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent implements OnInit{
  name !: string;
  educationData : IEducation[] = [] as IEducation[];
  searchText : string = '';

  constructor(
    private router: Router,
    private educationService: EducationApiService
  ){
  }

  ngOnInit(): void {
    this.name = this.router.url.slice(1);

    this.educationService.getAllEducation().subscribe({
      next:(res)=>{
        this.educationData = res;
      }
    })
  }
}
