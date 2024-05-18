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
  dataSource: any;
  displayedColumns: string[] = ['favoriteColor', 'birthDate'];

  motorTypeByGenderDataSource: any;
  motorTypeByGenderColumn: string[] = ['motorType', 'gender'];

  mostVisitorsDataSource: any;
  mostVisitorsColumn: string[] = ['city'];
  cityWithMostVisitors: string[] = [];
  mostVisitorsCount: number = 0;

  constructor(private buyerInfoService: BuyerInfoService) { }
  ngOnInit(): void {
    this.dataSource = this.motorTypeByGenderDataSource = this.mostVisitorsDataSource = this.buyerInfoService.getDataFromLocalStorage();
    // this.dataSource.sort((a: { birthDate: string; }, b: { birthDate: string; }) => (a.birthDate > b.birthDate) ? 1 : ((b.birthDate > a.birthDate) ? -1 : 0))
    // this.motorTypeByGenderDataSource.sort((a: { gender: string; }, b: { gender: string; }) => (a.gender > b.gender) ? 1 : ((b.gender > a.gender) ? -1 : 0))
    
    this.findMostVisitedCity();
   
  }
  findMostVisitedCity() {
    const cityCounts = new Map<string, number>();

    this.mostVisitorsDataSource.forEach((visitor:any) => {
      const visitorCity = visitor.location.city;
      const currentCount = cityCounts.get(visitorCity) || 0;
      cityCounts.set(visitorCity, currentCount + 1);
    });

    let mostVisitorsCity = '';
    let mostVisitors = 0;
    cityCounts.forEach((count, city) => {
      if (count > mostVisitors) {
        mostVisitorsCity = city;
        mostVisitors = count;
      }
    });
    
    this.cityWithMostVisitors.push(mostVisitorsCity);
    this.mostVisitorsCount = mostVisitors;
  }
}
