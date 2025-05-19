import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { IHomePage } from '../../core/interfaces/ihome-page';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule, SpinnerComponent],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnChanges {
  @Input() homeData!: IHomePage[];

  pieData: { name: string; value: number }[] = [];

  aquaColorScheme = {
    name: 'customAqua',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1E90FF', '#4169E1', '#6A5ACD', '#9370DB', '#D8BFD8', '#E6E6FA'],
  };

  ngOnChanges(): void {
    if (this.homeData) {
      this.pieData = this.homeData.map((item) => ({
        name: item.title,
        value: item.length,
      }));
    }
  }
}
