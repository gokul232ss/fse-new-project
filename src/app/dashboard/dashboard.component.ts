import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../common.service';
import { NewcompanyComponent } from '../newcompany/newcompany.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  companyList: any = [];
  companyCodeDropDownSelected: string = '';
  companyCode: String = '';
  companyObject: any;
  stockList:any=[];

  constructor(public dialog: MatDialog, private commonService: CommonService) { }

  ngOnInit(): void {
    this.getAllCompanyListDropDown();
  }

  getAllCompanyListDropDown() {
    this.commonService.getAllCompanyDropDown().subscribe(data => {
      this.companyList = JSON.parse(JSON.stringify(data));
    });
  }

  addNewCompany() {
    const dialogRef = this.dialog.open(NewcompanyComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  searchCompany() {
    if (this.companyCodeDropDownSelected || this.companyCode) {
      let code = this.companyCodeDropDownSelected != null ?
        this.companyCodeDropDownSelected : this.companyCode;
      this.commonService.getCompanyByCode(code).subscribe(data => {
        this.companyObject = JSON.parse(JSON.stringify(data));
        this.stockList=this.companyObject?.stockList;
      });
    }
  }

}
