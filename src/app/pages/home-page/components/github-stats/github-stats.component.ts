import { InlineSVGModule } from 'ng-inline-svg-2';
import { IGithubUser } from '../../../../core/interfaces/igithub-user';
import { GithubApiService } from './../../../../core/services/github-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-github-stats',
  standalone: true,
  imports: [InlineSVGModule],
  templateUrl: './github-stats.component.html',
  styleUrl: './github-stats.component.scss'
})
export class GithubStatsComponent implements OnInit{

  githubStats: IGithubUser | null = null;

  constructor( private GithubService: GithubApiService){

  }

  ngOnInit(): void {
    this.GithubService.getAllUserData().subscribe({
      next: (data)=>{
        this.githubStats = data;
        console.log(this.githubStats);
      }
    });
  }

  getAllRepos(){
    return Number(this.githubStats?.public_repos) +  Number(this.githubStats?.total_private_repos)
  }

}
