import { Component, OnInit } from '@angular/core';
import { BuyerInfoService } from '../../services/buyer-info.service';
import {MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule,DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  dataSource:any;
  displayedColumns: string[] = ['favoriteColor', 'birthDate'];
  constructor(private buyerInfoService:BuyerInfoService){}
  ngOnInit(): void {
    this.dataSource = this.buyerInfoService.getDataFromLocalStorage();
    this.mostPickedColorByAge();
  }
  mostPickedColorByAge(){
    let colorsArr = this.dataSource.map((item:any) =>item.favoriteColor);
    let colors = colorsArr.filter((value: any, index: any) => colorsArr.indexOf(value) === index);
    this.dataSource.sort((a: { birthDate: string; },b: { birthDate: string; }) => (a.birthDate > b.birthDate) ? 1 : ((b.birthDate > a.birthDate) ? -1 : 0))
  }
  
}
