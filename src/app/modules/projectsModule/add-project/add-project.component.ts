import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProjects } from '../../../core/interfaces/iprojects';
import { ProjectApiService } from '../../../core/services/project-api.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { UploadImageService } from '../../../core/services/upload-image.service';
import { ImageModalComponent } from "../../../shared/image-modal/image-modal.component";

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ImageModalComponent],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProject implements OnInit{
  newProject !: IProjects;
  projectForm !: FormGroup;
  isUploading = false;
  viewImg : boolean = false;
  uploadError: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb : FormBuilder,
    private projectService : ProjectApiService,
    private notifier: NotifierService,
    private router : Router,
    private uploadImgService: UploadImageService
  ){}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title:['', Validators.required],
      img:['', Validators.required],
      link:['', Validators.required],
      category:['', Validators.required],
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
        this.projectForm.patchValue({ img: url });
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

