import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExperiencesApiService } from '../../../core/services/experiences-api.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { IExperience } from '../../../core/interfaces/iexperience';

@Component({
  selector: 'app-add-experience',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-experience.component.html',
  styleUrl: './add-experience.component.scss'
})
export class AddExperienceComponent implements OnInit {
  experienceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperiencesApiService,
    private notifier: NotifierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.experienceForm = this.fb.group({
      title: ['', Validators.required],
      country: ['', Validators.required],
      date: ['', Validators.required],
      place: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.experienceForm.valid) {
      const newExperience: IExperience = {
        title: this.experienceForm.value.title,
        country: this.experienceForm.value.country,
        date: this.experienceForm.value.date,
        place: this.experienceForm.value.place
      };

      this.experienceService.addExperience(newExperience).subscribe({
        next: () => {
          this.router.navigateByUrl('/experiences');
          this.notifier.notify('success', 'Experience Added Successfully');
        },
        error: () => {
          this.notifier.notify('error', 'Failed to add experience');
        }
      });
    } else {
      this.notifier.notify('error', 'Please check all inputs again');
    }
  }
}
