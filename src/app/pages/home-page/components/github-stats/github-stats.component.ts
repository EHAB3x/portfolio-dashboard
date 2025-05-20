import { InlineSVGModule } from 'ng-inline-svg-2';
import { IGithubUser } from '../../../../core/interfaces/igithub-user';
import { GithubApiService } from './../../../../core/services/github-api.service';
import { Component, OnInit } from '@angular/core';
import { CardContentSkeletonComponent } from '../../../../shared/skeletons/card-content-skeleton/card-content-skeleton.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-github-stats',
  standalone: true,
  imports: [InlineSVGModule, CardContentSkeletonComponent, CommonModule],
  templateUrl: './github-stats.component.html',
  styleUrl: './github-stats.component.scss'
})
export class GithubStatsComponent implements OnInit{
  dataLoaded: boolean = false;
  githubStats: IGithubUser | null = null;
  cardsCount : number[] = Array(7).fill(1);

  constructor( private GithubService: GithubApiService){

  }

  ngOnInit(): void {
    this.GithubService.getAllUserData().subscribe({
      next: (data)=>{
        this.githubStats = data;
        this.dataLoaded = true;
      }
    });
  }

  getAllRepos(){
    return Number(this.githubStats?.public_repos) +  Number(this.githubStats?.total_private_repos)
  }

}
