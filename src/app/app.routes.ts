import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardClientComponent } from './pages/dashboard-client/dashboard-client.component';
import { DashboardProviderComponent } from './pages/dashboard-provider/dashboard-provider.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'clientdashboard', component: DashboardClientComponent },
    { path: 'providerdashboard', component: DashboardProviderComponent },
    { path: '**', component: HomeComponent }
];
