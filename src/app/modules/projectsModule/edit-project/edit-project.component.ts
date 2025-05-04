import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IProjects } from '../../../core/interfaces/iprojects';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectApiService } from '../../../core/services/project-api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export class EditProjectComponent  implements OnInit{
  prjID !: number;
  oldPrj : IProjects = {} as IProjects;
  newPrj !: IProjects;
  editEducationForm !: FormGroup;

  constructor(
    private fb : FormBuilder,
    private activeRoute : ActivatedRoute,
    private projectService : ProjectApiService,
    private notifier : NotifierService,
    private router : Router
  ){}

  ngOnInit(): void {
    const idParam = this.activeRoute.snapshot.paramMap.get("prjId");

    if (idParam) {
      this.prjID = Number(idParam);
    }

    this.projectService.getProjectById(this.prjID).subscribe({
      next:(res)=>{
        this.oldPrj = res;
        this.editEducationForm.patchValue({
          title:res.title,
          img:res.img,
          link:res.link,
          category:res.category,
        })
      }
    })
    this.editEducationForm = this.fb.group({
      title: [this.oldPrj.title, Validators.required],
      img: [this.oldPrj.img, Validators.required],
      link: [this.oldPrj.link, Validators.required],
      category: [this.oldPrj.category, Validators.required],
    })

  }

  onSubmit(){
    this.newPrj = {...this.editEducationForm.value, id: this.prjID};

    console.log(this.newPrj);

    this.projectService.updatePrjById(this.prjID, this.newPrj).subscribe({
      next:()=>{
        this.projectService.getAllProjects();
        this.notifier.show({
          type: 'success',
          message:"Product Updated Successfully",
        });
        this.router.navigateByUrl("/projects")
      },
      error:()=>{
        this.notifier.show({
          type: 'error',
          message:"Something Went Wrong",
        });
      }
    })

  }

  deleteEducation(){
    this.projectService.deleteProject(this.prjID).subscribe({
      next:()=>{
        this.projectService.getAllProjects();
        this.notifier.show({
          type: 'success',
          message:"Education Deleted Successfully",
        });
        this.router.navigateByUrl("/projects")
      },
      error:()=>{
        this.notifier.show({
          type: 'error',
          message:"Something Went Wrong",
        });
      }
    })
  }
}
