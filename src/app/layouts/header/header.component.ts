import { HomePageService } from './../../core/services/home-page.service';
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
  links : string[] = [] as string[];

  constructor(
    private authService : AuthServiceService,
    private homeService : HomePageService
  ) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe({
      next:(status=> {
        this.userStatus = status
      }),
    });

    this.homeService.getHomeData().subscribe({
      next:(res)=>{
        this.links = res.map((item)=> item.link.toLowerCase());
      }
    })
  }

  logout(){
    this.authService.userLoggedOut()
  }
}
