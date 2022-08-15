import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.createNewForm();


  constructor(private fb: FormBuilder, private userservice: UserService, private router: Router) {
    this.createNewForm();
  }

  createNewForm() {
    return this.loginForm = this.fb.group({
      emailId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.createNewForm();
    if (window.sessionStorage.getItem('fse-auth-token')) {
      this.router.navigateByUrl('/dashboard').then(()=>{
        window.location.reload();
      });
    }
  }

  submitLogin() {
    let map = {
      userName: this.loginForm?.get('emailId')?.value,
      password: this.loginForm?.get('password')?.value
    };
    this.userservice.login(map).subscribe(data => {
      let map = JSON.parse(JSON.stringify(data));
      if (map) {
        window.sessionStorage.setItem('fse-auth-token', map['auth-token']);
        this.router.navigateByUrl('/dashboard').then(()=>{
          window.location.reload();
        });
      }
    });
  }

  newUserSignUp() {

  }
}
