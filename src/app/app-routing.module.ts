import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: ['canActivateTeam'] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [{
    provide: 'canActivateTeam',
    useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return window.sessionStorage.getItem('fse-auth-token') ? true : false
    }
  }]
})
export class AppRoutingModule { }
