import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BuyerInfoService {
  arr: any = [];
  constructor() { }

  sendRequset(formDetails: any) {
    this.arr.push(formDetails.value)
    window.localStorage.setItem("buyer-info", JSON.stringify(this.arr));
  }
  getDataFromLocalStorage() {
    let data = window.localStorage.getItem("buyer-info");
    if (data) {
      data = JSON.parse(data);
      return data;
    }
    return [];
  }
  checkDateNotGratherThenToday(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let today = new Date();
      const value = control.value;

      if (!value) {
        return null;
      }

      if (control.value > today) {
        return {
          isDateNotGratherThenToday: true
        };
      }
      return null;
    }
  }
  findMostVisitedCity(mostVisitorsDataSource: any[]) {
    const cityCounts = new Map<string, number>();
    let cityWithMostVisitors = [];
    mostVisitorsDataSource.forEach((visitor: any) => {
      const visitorCity = visitor.location.city;
      const currentCount = cityCounts.get(visitorCity) || 0;
      cityCounts.set(visitorCity, currentCount + 1);
    });

    let mostVisitorsCity = '';
    let mostVisitors = 0;
    cityCounts.forEach((count, city) => {
      if (count > mostVisitors) {
        mostVisitorsCity = city;
      }
    });

    cityWithMostVisitors.push(mostVisitorsCity);
    return cityWithMostVisitors;
  }
  findMostCommonHobbie(mostCommonHobbie: any) {
    let arr: any[] = []
    mostCommonHobbie.forEach((visitor: any) => {
      visitor.hobbies.forEach((hobby: any) => {
        arr.push(hobby);
      });
    });
    const hashmap = arr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
    }, {})
    let res = Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
    return [res];
  }
  findMostPickedEngineByGender(mostPickedEngine: any) {
    let maleArr: any[] = [];
    let femaleArr: any[] = [];
    mostPickedEngine.forEach((item: any) => {
      if (item.gender === 'male') {
        maleArr.push(item.motorType);
      }
      if (item.gender === 'female') {
        femaleArr.push(item.motorType);
      }
    })

    const maleMap = maleArr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
    }, {})
    let maleRes = Object.keys(maleMap).reduce((a:any, b) => {
      return maleMap[a] > maleMap[b] ? a : b;
    },"");

    const femaleMap = femaleArr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
    }, {})
    let femalRes = Object.keys(femaleMap).reduce((a:any, b) => {
      return femaleMap[a] > femaleMap[b] ? a : b;
    },"");
    let res = [{gender:'male',motorType:maleRes},{gender:'female',motorType:femalRes}]
    return res;
  }
}
