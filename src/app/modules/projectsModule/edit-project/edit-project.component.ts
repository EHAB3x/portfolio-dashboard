import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IProjects } from '../../../core/interfaces/iprojects';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectApiService } from '../../../core/services/project-api.service';
import { NotifierService } from 'angular-notifier';
import { UploadImageService } from '../../../core/services/upload-image.service';
import { ImageModalComponent } from '../../../shared/image-modal/image-modal.component';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ImageModalComponent],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
})
export class EditProjectComponent implements OnInit {
  prjID!: number;
  editProjectForm!: FormGroup;
  isUploading = false;
  viewImg: boolean = false;
  uploadError: string | null = null;
  selectedFile: File | null = null;

  // Array to hold project tags/skills
  tagsList: string[] = [];

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private projectService: ProjectApiService,
    private notifier: NotifierService,
    private router: Router,
    private uploadImgService: UploadImageService,
  ) {}

  ngOnInit(): void {
    // 1. Initialize the form structure immediately with empty values
    this.editProjectForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      link: ['', Validators.required],
      img: ['', Validators.required],
      description: ['', Validators.required],
      tagInput: [''],
    });

    // 2. Get the project ID from route params
    const idParam = this.activeRoute.snapshot.paramMap.get('prjId');
    if (idParam) {
      this.prjID = Number(idParam);
      this.loadProjectData();
    }
  }

  loadProjectData(): void {
    this.projectService.getProjectById(this.prjID).subscribe({
      next: (res: any) => {
        // Populate form values
        this.editProjectForm.patchValue({
          title: res.title,
          category: res.category,
          link: res.link,
          img: res.img,
          description: res.description,
        });

        // Load existing tags if available from the backend
        if (res.tags && Array.isArray(res.tags)) {
          this.tagsList = [...res.tags];
        }
      },
      error: (err) => {
        this.notifier.show({
          type: 'error',
          message: 'Failed to load project details',
        });
      },
    });
  }

  // Tag management methods
  addTag(event: any): void {
    const inputTag = event.target.value.trim();
    if (inputTag && !this.tagsList.includes(inputTag)) {
      this.tagsList.push(inputTag);
      this.editProjectForm.patchValue({ tagInput: '' });
    }
    event.preventDefault();
  }

  removeTag(index: number): void {
    this.tagsList.splice(index, 1);
  }

  closeModel(status: boolean) {
    this.viewImg = status;
  }

  openModel() {
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
      },
    });
  }

  onSubmit() {
    if (this.editProjectForm.valid) {
      const formVal = this.editProjectForm.value;

      // Construct updated project payload including description and tags array
      const updatedProject = {
        id: this.prjID,
        title: formVal.title,
        category: formVal.category,
        link: formVal.link,
        img: formVal.img,
        description: formVal.description,
        tags: this.tagsList,
      };

      this.projectService
        .updatePrjById(this.prjID, updatedProject as any)
        .subscribe({
          next: () => {
            this.notifier.show({
              type: 'success',
              message: 'Project Updated Successfully',
            });
            this.router.navigateByUrl('/projects');
          },
          error: () => {
            this.notifier.show({
              type: 'error',
              message: 'Something Went Wrong',
            });
          },
        });
    } else {
      this.notifier.show({
        type: 'error',
        message: 'Please check all required fields',
      });
    }
  }

  deleteProjects() {
    this.projectService.deleteProject(this.prjID).subscribe({
      next: () => {
        this.notifier.show({
          type: 'success',
          message: 'Project Deleted Successfully',
        });
        this.router.navigateByUrl('/projects');
      },
      error: () => {
        this.notifier.show({
          type: 'error',
          message: 'Something Went Wrong',
        });
      },
    });
  }
}
