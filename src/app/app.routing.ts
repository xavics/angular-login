import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./authentication/authentication.component";
import {HomeComponent} from "./home/home.component";

const appRoutes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login'}
];

export const Routing = RouterModule.forRoot(appRoutes);
