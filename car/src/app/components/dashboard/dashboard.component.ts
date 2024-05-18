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
  motorTypeByGenderColumn: string[] = ['gender' ,'motorType' ];

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

  /*chart 2*/
  public pieChartOptions2: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels2: any = [];
  public pieChartDatasets2: any = [
    {
      data: [],
    },
  ];
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [];

  /*chart 3*/
  public pieChartOptions3: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels3: any = [];
  public pieChartDatasets3: any = [
    {
      data: [],
    },
  ];
  public pieChartLegend3 = true;
  public pieChartPlugins3 = [];

  constructor(private buyerInfoService: BuyerInfoService) { }
  ngOnInit(): void {
    this.hobbiesDataSource = this.motorTypeByGenderDataSource = this.mostVisitorsDataSource = this.buyerInfoService.getDataFromLocalStorage();
    this.cityWithMostVisitors = this.buyerInfoService.findMostVisitedCity(this.mostVisitorsDataSource);
    this.mostCommonHobbie = this.buyerInfoService.findMostCommonHobbie(this.hobbiesDataSource);
    this.mostPickedEngine = this.buyerInfoService.findMostPickedEngineByGender(this.motorTypeByGenderDataSource);
    this.showPie1();
    //this.showPie2();
    this.showPie3();
  }
  showPie1() {
    let data = this.buyerInfoService.getHobbiesForChart();
    console.log(data);
    let label: any[] = [];
    let pieData: any[] = [];
    for (let item in data) {
      label.push(item);
      pieData.push(data[item])
    }
    this.pieChartLabels1 = label;
    this.pieChartDatasets1[0].data = pieData;
  }
  showPie2() {
    
  }
  showPie3() {
    let data = this.buyerInfoService.getCities();
    let label: any[] = [];
    let pieData: any[] = [];
    for (let item in data) {
      label.push(item);
      pieData.push(data[item])
    }
    this.pieChartLabels3 = label;
    this.pieChartDatasets3[0].data = pieData;
  }
}
