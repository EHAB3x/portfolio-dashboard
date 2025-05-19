import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-content-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-content-skeleton.component.html',
  styleUrl: './card-content-skeleton.component.scss'
})
export class CardContentSkeletonComponent {
  @Input() showButton: boolean = true;
}
