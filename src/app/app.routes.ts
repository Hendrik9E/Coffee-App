import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login-screen/login-screen').then(
        (m) => m.LoginScreenPage
      )
  },

  {
  path: 'home',
  loadComponent: () =>
    import('./home/home-page').then(m => m.HomePage)
},

{
  path: 'manage',
   loadComponent: () => 
    import('./manage/manage-page').then(m => m.ManagePage)
}

];
