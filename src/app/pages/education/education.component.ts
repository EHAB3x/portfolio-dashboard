import { Component } from '@angular/core';
import { CategoryPageComponent } from "../../shared/category-page/category-page.component";

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CategoryPageComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {

}
