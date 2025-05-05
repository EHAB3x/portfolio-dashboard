import { Component, OnInit } from '@angular/core';
import { IAdmin } from '../../../core/interfaces/iadmin';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { SharedTableComponent } from "../../../shared/shared-table/shared-table.component";

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [SharedTableComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent implements OnInit{
  name !: string;
  adminData : IAdmin[] = [] as IAdmin[];

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ){
  }

  ngOnInit(): void {
    this.name = this.router.url.slice(1);

    this.authService.getAllAdmins().subscribe({
      next:(res)=>{
        this.adminData = res;
      }
    })
  }
}
