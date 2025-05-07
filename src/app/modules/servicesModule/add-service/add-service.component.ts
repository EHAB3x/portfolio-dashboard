import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceApiService } from '../../../core/services/service-api.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { IServices } from '../../../core/interfaces/iservices';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  serviceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servicesService: ServiceApiService,
    private notifier: NotifierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      title: ['', Validators.required],
      icon: ['', Validators.required],
      description: ['', Validators.required],
      features: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  get features(): FormArray<FormControl> {
    return this.serviceForm.get('features') as FormArray<FormControl>;
  }

  addFeature(): void {
    this.features.push(this.fb.control('', Validators.required));
  }

  removeFeature(index: number): void {
    this.features.removeAt(index);
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const newService: IServices = {
        title: this.serviceForm.value.title,
        icon: this.serviceForm.value.icon,
        description: this.serviceForm.value.description,
        features: this.serviceForm.value.features
      };

      this.servicesService.addService(newService).subscribe({
        next: () => {
          this.router.navigateByUrl('/services');
          this.notifier.notify('success', 'Service Added Successfully');
        },
        error: () => {
          this.notifier.notify('error', 'Failed to add service');
        }
      });
    } else {
      this.notifier.notify('error', 'Please check all inputs again');
    }
  }
}
