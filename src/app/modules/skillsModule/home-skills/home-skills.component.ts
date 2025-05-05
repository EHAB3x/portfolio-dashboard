import { Component, OnInit } from '@angular/core';
import { SharedTableComponent } from "../../../shared/shared-table/shared-table.component";
import { ISkills } from '../../../core/interfaces/iskills';
import { Router } from '@angular/router';
import { SkillsApiService } from '../../../core/services/skills-api.service';

@Component({
  selector: 'app-home-skills',
  standalone: true,
  imports: [SharedTableComponent],
  templateUrl: './home-skills.component.html',
  styleUrl: './home-skills.component.scss'
})
export class HomeSkillsComponent implements OnInit{
  name!: string;
  skillsData: ISkills[] = [] as ISkills[];
  searchText: string = '';

  constructor(
    private router: Router,
    private SkillService: SkillsApiService
  ) {}

  ngOnInit(): void {
    this.name = this.router.url.slice(1);

    this.SkillService.getAllSkills().subscribe({
      next: (res) => {
        this.skillsData = res;
      },
    });
  }
}
