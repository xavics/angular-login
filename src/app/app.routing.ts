import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./authentication/authentication.component";

const appRoutes: Routes = [
  { path: 'authentication', component: AuthenticationComponent },
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  { path: '**', redirectTo: '/authentication'}
];

export const Routing = RouterModule.forRoot(appRoutes);
