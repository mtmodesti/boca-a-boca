import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GlobalDataService } from '../services/global-data-service';

export const authGuard: CanActivateFn = () => {

    const globalData = inject(GlobalDataService);
    const router = inject(Router);
    const user = globalData.user();

    if (user) {
        return true;
    } else {
        router.navigate(['']);
        return false;
    }
};
