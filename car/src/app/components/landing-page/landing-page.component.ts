import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  gender : string[] = [];

  formDetails = new FormGroup({
    fullname: new FormControl<string>('', Validators.required),
    gender: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required,Validators.email]),
    birthDate: new FormControl('', [Validators.required,this.checkDateNotGratherThenToday()]),
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
    this.formDetails.markAllAsTouched();
    if (this.formDetails.valid) {
      this.buyerInfoService.sendRequset(this.formDetails);
    }
  }
  ngOnInit(): void {
    this.gender = ['male', 'female'];
    this.hobbies = ['skate', 'surf'];
    this.motorType = ['electric', 'fuel'];
  }
 
  checkDateNotGratherThenToday(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        let today = new Date();
        const value = control.value;

        if (!value) {
            return null;
        }

        if(control.value > today){
          return {
            isDateNotGratherThenToday: true
          };
        } 
        return null;
        
    }
}
}
