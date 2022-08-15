import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fseNewProject';
  logoutPresent: boolean = false;

  constructor(private router: Router) {
    this.logoutPresent = window.sessionStorage.getItem('fse-auth-token') ? true : false;
  }

  logout() {
    this.router.navigateByUrl('/logout');
  }


}
