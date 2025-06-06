import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from "./layouts/header/header.component";
import { NotifierModule } from 'angular-notifier';
import { AuthServiceService } from './core/services/auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NotifierModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'portfolio-dashboard';

  constructor(private authService: AuthServiceService){

  }

  ngOnInit(): void {
    const token = window.localStorage.getItem("token");
    if (token) {
      this.authService.getAuthStatus().next(true);
    }
  }

  ngAfterViewInit(){
    initFlowbite();
  }
}
