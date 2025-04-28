import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';
import { IEducation } from '../../core/interfaces/ieducation';
import { EducationApiService } from '../../core/services/education-api.service';
import { SharedTableComponent } from "../../shared/shared-table/shared-table.component";

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, SharedTableComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent implements OnInit{
  name !: string;
  searchControl = new FormControl('');
  educationData : IEducation[] = [] as IEducation[];

  constructor(
    private router: Router,
    private educationService: EducationApiService
  ){
  }

  ngOnInit(): void {
    this.name = this.router.url.slice(1);

    this.searchControl.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe({
      next:(res)=>{
      }
    })

    this.educationService.getAllEducation().subscribe({
      next:(res)=>{
        this.educationData = res;
      }
    })
  }
}
