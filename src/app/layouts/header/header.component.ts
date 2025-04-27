import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  userStatus !: boolean;

  constructor(private authService: AuthServiceService){

  }

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe({
      next:(status=> {
        this.userStatus = status
        console.log(this.userStatus);
      }),
    });
  }

  logout(){
    this.authService.userLoggedOut()
  }
}
