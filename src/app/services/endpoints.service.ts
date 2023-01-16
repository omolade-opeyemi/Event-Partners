import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  baseUrl = 'https://dev-online-backend.azurewebsites.net/'


  constructor(private http: HttpClient) { }
  individualAccount(data:any): Observable<any>{
    return this.http.post(this.baseUrl+ 'api/EventAccount/CreateEventSupplierIndividualAccount',data)
  }
}
