import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardClientComponent } from './pages/dashboard-client/dashboard-client.component';
import { DashboardProviderComponent } from './pages/dashboard-provider/dashboard-provider.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { InfoComponent } from './pages/info/info.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'clientdashboard', component: DashboardClientComponent },
    { path: 'providerdashboard', component: DashboardProviderComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'info', component: InfoComponent },
    { path: '**', component: HomeComponent }
];
