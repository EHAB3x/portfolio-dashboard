import { Component, OnInit } from '@angular/core';
import { IAdmin } from '../../../core/interfaces/iadmin';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [],
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.scss'
})
export class EditAdminComponent implements OnInit{
  adminID !: number;
  oldAdmin : IAdmin = {} as IAdmin;
  newAdmin !: IAdmin;
  adminsCount !: number;

  constructor(
    private activeRoute : ActivatedRoute,
    private authService : AuthServiceService,
    private notifier : NotifierService,
    private router : Router
  ){}

  ngOnInit(): void {
    const idParam = this.activeRoute.snapshot.paramMap.get("adminId");

    if (idParam) {
      this.adminID = Number(idParam);
    }

    this.authService.getAdminById(this.adminID).subscribe({
      next:(res)=>{
        this.oldAdmin = res;
      }
    })

    this.authService.getAllAdmins().subscribe({
      next:(res)=>{
        this.adminsCount = res.length;
      }
    })

  }

  deleteEducation(){
    if(this.adminsCount > 1){
      this.authService.deleteAdmin(this.adminID).subscribe({
        next:()=>{
          this.authService.getAllAdmins();
          this.notifier.show({
            type: 'success',
            message:"Admin Deleted Successfully",
          });
          this.router.navigateByUrl("/admins")
        },
        error:()=>{
          this.notifier.show({
            type: 'error',
            message:"Something Went Wrong",
          });
        }
      })
    }else{
      this.notifier.show({
        type: 'error',
        message:"Must be at least one admin",
      });
    }
  }
}
