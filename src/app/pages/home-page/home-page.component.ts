import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../../core/services/home-page.service';
import { IHomePage } from '../../core/interfaces/ihome-page';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, SpinnerComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  dataLoaded : boolean = false;
  homeCards : IHomePage [] = [] as IHomePage [];

  constructor(
    private homeService: HomePageService
  ){
  }

  ngOnInit(): void {
    this.homeService.getHomeData().subscribe({
      next:(res)=>{
        this.homeCards = res;
        this.dataLoaded  = true
      },
    })
  }
}
