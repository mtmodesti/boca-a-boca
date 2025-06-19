import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardClientComponent } from './pages/dashboard-client/dashboard-client.component';
import { DashboardProviderComponent } from './pages/dashboard-provider/dashboard-provider.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { InfoComponent } from './pages/info/info.component';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signup', component: SignUpComponent },

    // Rotas protegidas
    { path: 'registeredJobs', component: DashboardClientComponent, canActivate: [authGuard] },
    { path: 'providerdashboard', component: DashboardProviderComponent, canActivate: [authGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [authGuard] },
    { path: 'about', component: AboutComponent, canActivate: [authGuard] },
    { path: 'info', component: InfoComponent, canActivate: [authGuard] },
    { path: '**', component: HomeComponent, canActivate: [authGuard] },
]