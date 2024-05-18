import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BuyerInfoService } from '../../services/buyer-info.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatSelectModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  providers: [provideNativeDateAdapter()]
})

export class LandingPageComponent implements OnInit {
  constructor(private buyerInfoService: BuyerInfoService,private toastr: ToastrService) { }
  hobbies: string[] = [];
  motorType: string[] = [];
  gender: string[] = [];

  formDetails = new FormGroup({
    fullname: new FormControl<string>('', Validators.required),
    gender: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', [Validators.required, this.buyerInfoService.checkDateNotGratherThenToday()]),
    location: new FormGroup({
      address: new FormControl<string>('', Validators.required),
      city: new FormControl<string>('', Validators.required),
      country: new FormControl<string>('', Validators.required),
    }),
    hobbies: new FormControl<string[]>([], Validators.required),
    favoriteColor: new FormControl('#000000', Validators.required),
    amountOfSeats: new FormControl('', [Validators.required, Validators.min(2), Validators.max(7)]),
    motorType: new FormControl('', Validators.required),
  });

  saveDetails(): void {
    
    if (this.formDetails.valid) {
      this.buyerInfoService.sendRequset(this.formDetails);
      this.toastr.success('the request was sent and a mail with match will be sent to you.','success');
      this.formDetails.reset();
    }else{
      this.toastr.error('you need to fill all fileds','error');
    }
    this.formDetails.markAllAsTouched();
  }
  ngOnInit(): void {
    this.gender = ['male', 'female'];
    this.hobbies = ['skate', 'surf','climbing','watch movie','go to gym'];
    this.motorType = ['electric', 'fuel'];
  }


}
