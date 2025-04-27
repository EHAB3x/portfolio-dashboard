import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent implements OnInit{
  name !: string;

  searchControl = new FormControl('');

  constructor(private router: Router){
  }

  ngOnInit(): void {
    this.name = this.router.url.slice(1);

    this.searchControl.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe({
      next:(res)=>{

      }
    })
  }
}
