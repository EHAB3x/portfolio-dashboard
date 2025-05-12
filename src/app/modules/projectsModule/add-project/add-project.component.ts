import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProjects } from '../../../core/interfaces/iprojects';
import { ProjectApiService } from '../../../core/services/project-api.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProject implements OnInit{
  newProject !: IProjects;
  projectForm !: FormGroup;
  constructor(
    private fb : FormBuilder,
    private projectService : ProjectApiService,
    private notifier: NotifierService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title:['', Validators.required],
      img:['', Validators.required],
      link:['', Validators.required],
      category:['', Validators.required],
    })
  }

  onSubmit(){
    if (this.projectForm.valid) {
      const newProject: IProjects = this.projectForm.value;

      this.projectService.addProject(newProject).subscribe({
        next:()=>{
          this.router.navigateByUrl('/projects');
          this.notifier.show({
            type: 'success',
            message:"Project Added Successfully",
          });
        }
      });

    } else {
      this.notifier.show({
        type: 'error',
        message:"Please Check All Inputs Again",
      });
    }
  }
}

