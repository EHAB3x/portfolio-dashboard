import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceApiService } from '../../../core/services/service-api.service';
import { NotifierService } from 'angular-notifier';
import { IServices } from '../../../core/interfaces/iservices';

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {
  serviceID!: number;
  oldService: IServices = {} as IServices;
  editServiceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private servicesService: ServiceApiService,
    private notifier: NotifierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the service ID from the route
    const idParam = this.activeRoute.snapshot.paramMap.get('serviceId');
    if (idParam) {
      this.serviceID = Number(idParam);
    }

    // Initialize the form with empty values
    this.editServiceForm = this.fb.group({
      title: ['', Validators.required],
      icon: ['', Validators.required],
      description: ['', Validators.required],
      features: this.fb.array([]) // Initialize as empty FormArray
    });

    // Fetch the service data and populate the form
    this.servicesService.getServiceById(this.serviceID).subscribe({
      next: (res) => {
        this.oldService = res;
        // Populate the FormArray with features
        const featureControls = res.features.map(feature =>
          this.fb.control(feature, Validators.required)
        );
        this.editServiceForm.setControl('features', this.fb.array(featureControls));
        // Patch the rest of the form values
        this.editServiceForm.patchValue({
          title: res.title,
          icon: res.icon,
          description: res.description
        });
      },
      error: () => {
        this.notifier.notify('error', 'Failed to load service data');
      }
    });
  }

  // Getter for the features FormArray
  get features(): FormArray<FormControl> {
    return this.editServiceForm.get('features') as FormArray<FormControl>;
  }

  // Add a new feature input to the FormArray
  addFeature(): void {
    this.features.push(this.fb.control('', Validators.required));
  }

  // Remove a feature input by index
  removeFeature(index: number): void {
    this.features.removeAt(index);
  }

  onSubmit(): void {
    if (this.editServiceForm.valid) {
      const updatedService: IServices = {
        id: this.serviceID,
        title: this.editServiceForm.value.title,
        icon: this.editServiceForm.value.icon,
        description: this.editServiceForm.value.description,
        features: this.editServiceForm.value.features
      };

      this.servicesService.updateServiceById(this.serviceID, updatedService).subscribe({
        next: () => {
          this.servicesService.getAllServices(); // Refresh services (consider if necessary)
          this.notifier.notify('success', 'Service Updated Successfully');
          this.router.navigateByUrl('/services');
        },
        error: () => {
          this.notifier.notify('error', 'Something Went Wrong');
        }
      });
    } else {
      this.notifier.notify('error', 'Please check all inputs again');
    }
  }

  deleteService(): void {
    this.servicesService.deleteService(this.serviceID).subscribe({
      next: () => {
        this.servicesService.getAllServices(); // Refresh services (consider if necessary)
        this.notifier.notify('success', 'Service Deleted Successfully');
        this.router.navigateByUrl('/services');
      },
      error: () => {
        this.notifier.notify('error', 'Something Went Wrong');
      }
    });
  }
}
