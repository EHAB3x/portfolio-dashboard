import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IProjects } from '../../../core/interfaces/iprojects';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectApiService } from '../../../core/services/project-api.service';
import { NotifierService } from 'angular-notifier';
import { UploadImageService } from '../../../core/services/upload-image.service';
import { ImageModalComponent } from "../../../shared/image-modal/image-modal.component";

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ImageModalComponent],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export class EditProjectComponent  implements OnInit{
  prjID !: number;
  oldPrj : IProjects = {} as IProjects;
  newPrj !: IProjects;
  editProjectForm !: FormGroup;
  isUploading = false;
  viewImg : boolean = false;
  uploadError: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb : FormBuilder,
    private activeRoute : ActivatedRoute,
    private projectService : ProjectApiService,
    private notifier : NotifierService,
    private router : Router,
    private uploadImgService: UploadImageService

  ){}

  ngOnInit(): void {
    const idParam = this.activeRoute.snapshot.paramMap.get("prjId");

    if (idParam) {
      this.prjID = Number(idParam);
    }

    this.projectService.getProjectById(this.prjID).subscribe({
      next:(res)=>{
        this.oldPrj = res;
        this.editProjectForm.patchValue({
          title:res.title,
          img:res.img,
          link:res.link,
          category:res.category,
        })
      }
    })
    this.editProjectForm = this.fb.group({
      title: [this.oldPrj.title, Validators.required],
      img: [this.oldPrj.img, Validators.required],
      link: [this.oldPrj.link, Validators.required],
      category: [this.oldPrj.category, Validators.required],
    })

  }

  closeModel(status: boolean){
    this.viewImg = status;
  }

  openModel(){
    this.viewImg = true;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadImage();
    }
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      this.uploadError = 'Please select an image.';
      return;
    }

    this.isUploading = true;
    this.uploadError = null;

    this.uploadImgService.uploadImage(this.selectedFile).subscribe({
      next: (url) => {
        this.editProjectForm.patchValue({ img: url });
        this.isUploading = false;
        this.selectedFile = null;
        this.notifier.show({
          type: 'success',
          message: 'Image uploaded successfully',
        });
      },
      error: (err) => {
        this.uploadError = 'Failed to upload image. Please try again.';
        this.isUploading = false;
        this.notifier.show({
          type: 'error',
          message: this.uploadError,
        });
        console.error(err);
      }
    });
  }

  onSubmit(){
    this.newPrj = {...this.editProjectForm.value, id: this.prjID};

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

  deleteProjects(){
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
