import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyerInfoService {

  constructor() { }

  sendRequset(formDetails:any){
    window.localStorage.setItem("buyer-info",JSON.stringify(formDetails.value));
  }
}
