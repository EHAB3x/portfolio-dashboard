import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../../core/services/home-page.service';
import { IHomePage } from '../../core/interfaces/ihome-page';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from "../../shared/pie-chart/pie-chart.component";
import { GithubStatsComponent } from "./components/github-stats/github-stats.component";
import { HomeCardComponent } from './components/home-card/home-card.component';
import { CardContentSkeletonComponent } from '../../shared/skeletons/card-content-skeleton/card-content-skeleton.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HomeCardComponent ,PieChartComponent, GithubStatsComponent, CardContentSkeletonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  dataLoaded : boolean = false;
  homeCards : IHomePage [] = [] as IHomePage [];
  cardsLength: number[] = Array(6).fill(1)

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
