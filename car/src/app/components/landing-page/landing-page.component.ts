import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BuyerInfoService } from '../../services/buyer-info.service';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatSelectModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  providers: [provideNativeDateAdapter()]
})

export class LandingPageComponent implements OnInit {
  constructor(private buyerInfoService: BuyerInfoService) {}
  hobbies: string[] = [];
  motorType: string[] = [];

  formDetails = new FormGroup({
    fullname: new FormControl<string>('', Validators.required),
    gender: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    location: new FormGroup({
      address: new FormControl<string>('', Validators.required),
      city: new FormControl<string>('', Validators.required),
      country: new FormControl<string>('', Validators.required),
    }),
    hobbies: new FormControl<string[]>([], Validators.required),
    favoriteColor: new FormControl('', Validators.required),
    amountOfSeats: new FormControl('', [Validators.required, Validators.min(2), Validators.max(7)]),
    motorType: new FormControl('', Validators.required),
  });

  saveDetails(): void {
    console.log(this.formDetails.valid);
    if (this.formDetails.valid) {
      this.buyerInfoService.sendRequset(this.formDetails);
    }
  }
  ngOnInit(): void {
    this.hobbies = ['skate', 'surf'];
    this.motorType = ['electric', 'fuel']
  }
}
