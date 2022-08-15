import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  saveCompany(createObj: any) {
    return this.http.post("http://localhost:8080/company/register", createObj);
  }

  getAllCompanyDropDown() {
    return this.http.get("http://localhost:8080/company/getAllCompanyForDropDown");
  }

  getCompanyByCode(code: String) {
    return this.http.get("http://localhost:8080/company/info/"+code);
  }

}
