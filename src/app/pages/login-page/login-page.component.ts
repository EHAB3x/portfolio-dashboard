import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ILoginData } from '../../core/interfaces/ilogin-data';
import { CommonModule } from '@angular/common';
import { NotifierService } from 'angular-notifier';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit{
  loginData: ILoginData = {
    username: '',
    password: ''
  };

  constructor(
    private notifier: NotifierService,
    private authService: AuthServiceService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe({
      next:()=>{
        this.router.navigateByUrl("/")
      }
    })
  }


  userLogin(){
    this.authService.login(this.loginData).subscribe({
      next:(res)=>{
        this.notifier.show({
          type: 'success',
          message:res.message,
        });

      },
      error:(err)=>{
        this.notifier.show({
          type: 'error',
          message:err.error.message,
        });
      }
    })
  }
}
