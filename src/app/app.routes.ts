import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'',loadComponent:()=>import('./components/calculadorafit/calculadorafit.component')},
  {path:'compressimg',loadComponent:()=>import('./components/compresorimg/compresorimg.component')},
  {path:'**',redirectTo:'',pathMatch:'full'}
];
