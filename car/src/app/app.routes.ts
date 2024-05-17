import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'',component:LandingPageComponent},
    {path:'landing-page',component:LandingPageComponent},
    {path:'dashboard',component:DashboardComponent},
];
