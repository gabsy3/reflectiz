import { Component, OnInit } from '@angular/core';
import { BuyerInfoService } from '../../services/buyer-info.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, DatePipe, CommonModule, BaseChartDirective,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  hobbiesDataSource: any;
  hobbiesColumn: string[] = ['hobbies'];
  mostCommonHobbie: string[] = [];

  motorTypeByGenderDataSource: any;
  mostPickedEngine: { gender: string; motorType: string; }[] = [];
  motorTypeByGenderColumn: string[] = ['motorType', 'gender'];

  mostVisitorsDataSource: any;
  mostVisitorsColumn: string[] = ['city'];
  cityWithMostVisitors: string[] = [];

  /*chart 1*/
  public pieChartOptions1: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels1: any = [];
  public pieChartDatasets1: any = [
    {
      data: [],
    },
  ];
  public pieChartLegend1 = true;
  public pieChartPlugins1 = [];

  constructor(private buyerInfoService: BuyerInfoService) { }
  ngOnInit(): void {
    this.hobbiesDataSource = this.motorTypeByGenderDataSource = this.mostVisitorsDataSource = this.buyerInfoService.getDataFromLocalStorage();
    this.cityWithMostVisitors = this.buyerInfoService.findMostVisitedCity(this.mostVisitorsDataSource);
    this.mostCommonHobbie = this.buyerInfoService.findMostCommonHobbie(this.hobbiesDataSource);
    this.mostPickedEngine = this.buyerInfoService.findMostPickedEngineByGender(this.motorTypeByGenderDataSource);
    this.showPie();
  }
  showPie(){
    let data = this.buyerInfoService.getHobbiesForChart();
    let label:any[] = [];
    let pieData:any[] = [];
    for(let item in data){
      label.push(item);
      pieData.push(data[item])
    }
    this.pieChartLabels1 = label;
    this.pieChartDatasets1[0].data = pieData;
  }
}
