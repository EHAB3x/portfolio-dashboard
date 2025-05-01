import { Component, OnInit } from '@angular/core';
import { EducationApiService } from '../../../core/services/education-api.service';
import { IEducation } from '../../../core/interfaces/ieducation';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-education',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.scss'
})
export class AddEducationComponent implements OnInit{
  newEducation !: IEducation;
  educationForm !: FormGroup;
  constructor(
    private fb : FormBuilder,
    private educationService : EducationApiService,
    private notifier: NotifierService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.educationForm = this.fb.group({
      title:['', Validators.required],
      place:['', Validators.required],
      country:['', Validators.required],
      date:['', Validators.required],
    })
  }

  onSubmit(){
    if (this.educationForm.valid) {
      const newEducation: IEducation = this.educationForm.value;

      console.log( this.educationForm);
      console.log( this.educationForm.value);

      this.educationService.addEducation(newEducation).subscribe({
        next:()=>{
          this.router.navigateByUrl('/educations');
          this.notifier.show({
            type: 'success',
            message:"Education Added Successfully",
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
