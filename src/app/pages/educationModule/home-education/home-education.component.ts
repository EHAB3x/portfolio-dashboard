import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedTableComponent } from '../../../shared/shared-table/shared-table.component';
import { EducationApiService } from '../../../core/services/education-api.service';
import { IEducation } from '../../../core/interfaces/ieducation';


@Component({
  selector: 'app-home-education',
  standalone: true,
  imports: [SharedTableComponent],
  templateUrl: './home-education.component.html',
  styleUrl: './home-education.component.scss'
})
export class HomeEducationComponent implements OnInit{
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
