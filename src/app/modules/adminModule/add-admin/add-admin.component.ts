import { Component, OnInit } from '@angular/core';
import { IAdmin } from '../../../core/interfaces/iadmin';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.scss'
})
export class AddAdminComponent implements OnInit{
  newAdmin !: IAdmin;
  adminForm !: FormGroup;
  constructor(
    private fb : FormBuilder,
    private authService : AuthServiceService,
    private notifier: NotifierService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],
    })
  }

  onSubmit(){
    if (this.adminForm.valid) {
      const newAdmin: IAdmin = this.adminForm.value;

      this.authService.addAdmin(newAdmin).subscribe({
        next:()=>{
          this.router.navigateByUrl('/admins');
          this.notifier.show({
            type: 'success',
            message:"Admin Added Successfully",
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
