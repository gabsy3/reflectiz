import { Component, OnInit } from '@angular/core';
import { BuyerInfoService } from '../../services/buyer-info.service';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  hobbiesDataSource: any;
  hobbiesColumn: string[] = ['hobbies'];

  motorTypeByGenderDataSource: any;
  motorTypeByGenderColumn: string[] = ['motorType', 'gender'];

  mostVisitorsDataSource: any;
  mostVisitorsColumn: string[] = ['city'];
  cityWithMostVisitors: string[] = [];
  mostVisitorsCount: number = 0;

  constructor(private buyerInfoService: BuyerInfoService) { }
  ngOnInit(): void {
    this.hobbiesDataSource = this.motorTypeByGenderDataSource = this.mostVisitorsDataSource = this.buyerInfoService.getDataFromLocalStorage();
    this.cityWithMostVisitors = this.buyerInfoService.findMostVisitedCity(this.mostVisitorsDataSource);
  }
  
}
