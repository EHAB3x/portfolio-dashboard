import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../../core/services/home-page.service';
import { IHomePage } from '../../core/interfaces/ihome-page';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  homeCards : IHomePage [] = [] as IHomePage [];

  constructor(
    private homeService: HomePageService
  ){
  }

  ngOnInit(): void {
    this.homeService.getHomeData().subscribe({
      next:(res)=>{
        this.homeCards = res;
      }
    })
  }
}
