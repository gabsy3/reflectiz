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
    return window.localStorage.getItem("buyer-info");
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
}
