import { Component } from '@angular/core';
import { IProjects } from '../../../core/interfaces/iprojects';
import { Router } from '@angular/router';
import { ProjectApiService } from '../../../core/services/project-api.service';
import { SharedTableComponent } from "../../../shared/shared-table/shared-table.component";

@Component({
  selector: 'app-home-project',
  standalone: true,
  imports: [SharedTableComponent],
  templateUrl: './home-project.component.html',
  styleUrl: './home-project.component.scss',
})
export class HomeProjectComponent {
  name!: string;
  projectData: IProjects[] = [] as IProjects[];
  searchText: string = '';

  constructor(
    private router: Router,
    private projectService: ProjectApiService
  ) {}

  ngOnInit(): void {
    this.name = this.router.url.slice(1);

    this.projectService.getAllProjects().subscribe({
      next: (res) => {
        this.projectData = res;
      },
    });
  }
}
