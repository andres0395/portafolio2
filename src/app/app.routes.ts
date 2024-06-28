import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'calculator',loadComponent:()=>import('./components/calculadorafit/calculadorafit.component')},
  {path:'**',redirectTo:'calculator',pathMatch:'full'}
];
