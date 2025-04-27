import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '../../core/interfaces/icategory';
import { ISkills } from '../../core/interfaces/iskills';
import { Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss'
})
export class CategoryPageComponent implements OnInit{
  name !: string;

  @Input() CategoryData !: ICategory[];

  searchControl = new FormControl('');

  constructor(
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.name = this.router.url.slice(1);

    this.searchControl.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(searchText =>{
      this.CategoryData = this.CategoryData.filter(item => item.title == searchText || item.description == searchText);
    })
  }

}
