import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class AddProject implements OnInit {
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
      title: ['', Validators.required],
      category: ['', Validators.required],
      link: ['', Validators.required],
      img: ['', Validators.required],
      description: ['', Validators.required], // Added description control
      tagInput: [''] // Temporary field to help type and push tags
    });
  }

  // Getter to easily access tags array if you want or manage them via a simple string array helper
  tagsList: string[] = [];

  addTag(event: any): void {
    const inputTag = event.target.value.trim();
    if (inputTag && !this.tagsList.includes(inputTag)) {
      this.tagsList.push(inputTag);
      this.projectForm.patchValue({ tagInput: '' });
    }
    event.preventDefault();
  }

  removeTag(index: number): void {
    this.tagsList.splice(index, 1);
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
      // Map form values and include the tags array
      const formVal = this.projectForm.value;
      const newProject = {
        title: formVal.title,
        category: formVal.category,
        link: formVal.link,
        img: formVal.img,
        description: formVal.description,
        tags: this.tagsList // Array of strings mapping to your C# List<string> backend
      };

      this.projectService.addProject(newProject as any).subscribe({
        next: () => {
          this.router.navigateByUrl('/projects');
          this.notifier.show({
            type: 'success',
            message: "Project Added Successfully",
          });
        },
        error: (err) => {
          this.notifier.show({
            type: 'error',
            message: "Failed to add project",
          });
        }
      });

    } else {
      this.notifier.show({
        type: 'error',
        message: "Please Check All Inputs Again",
      });
    }
  }
}
