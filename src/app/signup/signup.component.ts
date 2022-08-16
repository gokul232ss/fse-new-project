import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = this.createNewForm();

  constructor(private fb: FormBuilder, private commonService: CommonService,
    private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<SignupComponent>) { }

  ngOnInit(): void {
  }

  createNewForm() {
    return this.signupForm = this.fb.group({
      emailId: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  saveNewUser() {
    if (this.signupForm.valid) {
      let map = {
        "email": this.signupForm?.get('emailId')?.value,
        "firstName": this.signupForm?.get('firstName')?.value,
        "lastName": this.signupForm?.get('lastName')?.value,
        "password": this.signupForm?.get('password')?.value
      };
      this.commonService.saveUser(map).subscribe(data => {
        this._snackBar.open('Company save successfully', 'Undo', {
          duration: 3000
        });
        this.dialogRef.close();
      }, error => {
        this._snackBar.open(error, 'Dismiss', {
          duration: 3000
        });
      })
    }
  }

  closeClick() {
    this.dialogRef.close();
  }
}
