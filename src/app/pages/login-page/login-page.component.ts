import { Component } from '@angular/core';
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
export class LoginPageComponent {
  loginData: ILoginData = {
    username: '',
    password: ''
  };

  constructor(
    private notifier: NotifierService,
    private authService: AuthServiceService,
    private router: Router
  ){

  }
  userLogin(){
    this.authService.login(this.loginData).subscribe({
      next:(res)=>{
        this.notifier.show({
          type: 'success',
          message:res.message,
        });

        // this.router.navigateByUrl("/home")
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
