import { Component, OnInit } from '@angular/core';
import { IExperience } from '../../../core/interfaces/iexperience';
import { Router } from '@angular/router';
import { ExperiencesApiService } from '../../../core/services/experiences-api.service';
import { SharedTableComponent } from "../../../shared/shared-table/shared-table.component";

@Component({
  selector: 'app-home-experience',
  standalone: true,
  imports: [SharedTableComponent],
  templateUrl: './home-experience.component.html',
  styleUrl: './home-experience.component.scss'
})
export class HomeExperienceComponent implements OnInit{
  name!: string;
  experienceData: IExperience[] = [] as IExperience[];

  constructor(
    private router: Router,
    private experienceService: ExperiencesApiService
  ) {}

  ngOnInit(): void {
    this.name = this.router.url.slice(1);

    this.experienceService.getAllExperiences().subscribe({
      next: (res) => {
        this.experienceData = res;
      },
    });
  }
}
