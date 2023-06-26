import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const emptyLocalStorageGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const localStorageData = localStorage.getItem('indirizzoIp'); // Change 'myData' with your localStorage key

  if (!localStorageData || localStorageData === '') {
    // Redirect to 'primaConfigurazione' route

    router.navigate(['primaConfigurazione']);
    return false;
  }

  return true;
};
