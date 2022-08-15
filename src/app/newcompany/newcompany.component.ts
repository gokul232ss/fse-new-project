import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-newcompany',
  templateUrl: './newcompany.component.html',
  styleUrls: ['./newcompany.component.css']
})
export class NewcompanyComponent implements OnInit {

  companyForm: FormGroup = this.createNewForm();

  constructor(private fb: FormBuilder, private commonService: CommonService,
    private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<NewcompanyComponent>) { 
      this.createNewForm();
    }

  ngOnInit(): void {
  }

  createNewForm() {
    return this.companyForm = this.fb.group({
      name: new FormControl('', Validators.required),
      ceo: new FormControl('', Validators.required),
      turnover: new FormControl('', Validators.required)
    });
  }

  submitCompany() {
    let map = {
      "companyCEO": this.companyForm?.get('ceo')?.value,
      "companyName": this.companyForm?.get('name')?.value,
      "companyTuneOver": this.companyForm?.get('turnover')?.value
    };
    this.commonService.saveCompany(map).subscribe(data => {
      this._snackBar.open('Company save successfully', 'Undo', {
        duration: 3000
      });
      this.dialogRef.close();
    })

  }

  closeClick(){
    this.dialogRef.close();
  }
}
