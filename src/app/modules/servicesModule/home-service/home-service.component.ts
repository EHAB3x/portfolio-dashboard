import { Component, OnInit } from '@angular/core';
import { IServices } from '../../../core/interfaces/iservices';
import { Router } from '@angular/router';
import { ServiceApiService } from '../../../core/services/service-api.service';
import { SharedTableComponent } from "../../../shared/shared-table/shared-table.component";

@Component({
  selector: 'app-home-service',
  standalone: true,
  imports: [SharedTableComponent],
  templateUrl: './home-service.component.html',
  styleUrl: './home-service.component.scss'
})
export class HomeServiceComponent implements OnInit{
  name!: string;
  servicesData: IServices[] = [] as IServices[];

  constructor(
    private router: Router,
    private servicesService: ServiceApiService
  ) {}

  ngOnInit(): void {
    this.name = this.router.url.slice(1);

    this.servicesService.getAllServices().subscribe({
      next: (res) => {
        this.servicesData = res;
      },
    });
  }
}
