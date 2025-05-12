import { Component, OnInit } from '@angular/core';
import { IExperience } from '../../../core/interfaces/iexperience';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperiencesApiService } from '../../../core/services/experiences-api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-experience',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-experience.component.html',
  styleUrl: './edit-experience.component.scss'
})
export class EditExperienceComponent implements OnInit{
  experienceID !: number;
  oldExperience : IExperience = {} as IExperience;
  newExperience !: IExperience;
  editExperienceForm !: FormGroup;

  constructor(
    private fb : FormBuilder,
    private activeRoute : ActivatedRoute,
    private experienceService : ExperiencesApiService,
    private notifier : NotifierService,
    private router : Router
  ){}

  ngOnInit(): void {
    const idParam = this.activeRoute.snapshot.paramMap.get("experienceId");

    if (idParam) {
      this.experienceID = Number(idParam);
    }

    this.experienceService.getExperienceById(this.experienceID).subscribe({
      next:(res)=>{
        this.oldExperience = res;
        this.editExperienceForm.patchValue({
          title:res.title,
          place:res.place,
          date:res.date,
          country:res.country,
        })
      }
    })
    this.editExperienceForm = this.fb.group({
      title: [this.oldExperience.title, Validators.required],
      place: [this.oldExperience.place, Validators.required],
      date: [this.oldExperience.date, Validators.required],
      country: [this.oldExperience.country, Validators.required],
    })

  }

  onSubmit(){
    this.newExperience = {...this.editExperienceForm.value, id: this.experienceID};

    this.experienceService.updateServiceById(this.experienceID, this.newExperience).subscribe({
      next:()=>{
        this.experienceService.getAllExperiences();
        this.notifier.show({
          type: 'success',
          message:"Experience Updated Successfully",
        });
        this.router.navigateByUrl("/experiences")
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
    this.experienceService.deleteExperience(this.experienceID).subscribe({
      next:()=>{
        this.experienceService.getAllExperiences();
        this.notifier.show({
          type: 'success',
          message:"Experience Deleted Successfully",
        });
        this.router.navigateByUrl("/experiences")
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
