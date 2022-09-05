import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  saveCompany(createObj: any) {
    return this.http.post(environment.domain+"/company/register", createObj);
  }

  getAllCompanyDropDown() {
    return this.http.get(environment.domain+"/company/getAllCompanyForDropDown");
  }

  getCompanyByCode(code: String) {
    return this.http.get(environment.domain+"/company/info/"+code);
  }

  saveUser(createObj: any) {
    return this.http.post(environment.domain+"/user/createUser", createObj);
  }
}
