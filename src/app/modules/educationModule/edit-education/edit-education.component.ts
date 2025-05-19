import { EducationApiService } from './../../../core/services/education-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEducation } from '../../../core/interfaces/ieducation';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-education',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-education.component.html',
  styleUrl: './edit-education.component.scss'
})
export class EditEducationComponent implements OnInit{
  eduID !: number;
  oldEdu : IEducation = {} as IEducation;
  newEdu !: IEducation;
  editEducationForm !: FormGroup;

  constructor(
    private fb : FormBuilder,
    private activeRoute : ActivatedRoute,
    private educationService : EducationApiService,
    private notifier : NotifierService,
    private router : Router
  ){}

  ngOnInit(): void {
    const idParam = this.activeRoute.snapshot.paramMap.get("eduId");
    if (idParam) {
      this.eduID = Number(idParam);
    }

    this.educationService.getEducationById(this.eduID).subscribe({
      next:(res)=>{
        this.oldEdu = res;
        this.editEducationForm.patchValue({
          title:res.title,
          place:res.place,
          country:res.country,
          date:res.date,
        })
      }
    })
    this.editEducationForm = this.fb.group({
      title: ['', Validators.required],
      place: ['', Validators.required],
      country: ['', Validators.required],
      date: ['', Validators.required],
    })

  }

  onsubmit(){
    this.newEdu = {...this.editEducationForm.value, id: this.eduID};

    this.educationService.updateEduById(this.eduID, this.newEdu).subscribe({
      next:()=>{
        this.educationService.getAllEducation();
        this.notifier.show({
          type: 'success',
          message:"Education Updated Successfully",
        });
        this.router.navigateByUrl("/educations")
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
    this.educationService.deleteEducation(this.eduID).subscribe({
      next:()=>{
        this.educationService.getAllEducation();
        this.notifier.show({
          type: 'success',
          message:"Education Deleted Successfully",
        });
        this.router.navigateByUrl("/educations")
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
