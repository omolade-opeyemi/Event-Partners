import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient, private toastr: ToastrService,
    public router: Router) { }

  baseUrl = environment['onlinePortalUrl'];
  email = environment['email'];
  password = environment['password']

  getToken() {
    return localStorage.getItem('a-token')
  }

  generateAuthToken() {
    return this.http.get<any>(`${this.baseUrl}/api/Auth/GenerateToken`, {
      params: new HttpParams()
        .set('email', this.email)
        .set('password', this.password)
    })
      .pipe(map(res => {
        return res;
      }))

  }


  token: any;
  refreshToken: any;


  logOut() {
    alert('your session expired')
    this.token = '';
    localStorage.removeItem('a-token')
    this.router.navigateByUrl('/')
  }
}
