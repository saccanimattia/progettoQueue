import { CanActivateFn } from '@angular/router';

export const emptyLocalStorageGuard: CanActivateFn = (route, state) => {
  const localStorageData = localStorage.getItem('myData'); // Change 'myData' with your localStorage key

  if (!localStorageData || localStorageData === '') {
    // Redirect to 'primaConfigurazione' route
    state.url = '/primaConfigurazione';
    return false;
  }

  return true;
};
