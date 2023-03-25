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

  businessAccount(data:any): Observable<any>{
    return this.http.post(this.baseUrl+ 'api/EventAccount/CreateEventSupplierBusinessAccount', data)
  }
  getStates(): Observable<any>{
    return this.http.get(this.baseUrl+ '/api/Utilities/GetStates')
  }
  getLga(id:number): Observable<any>{
    return this.http.get(this.baseUrl+ "api/Utilities/GetLocalGovtAreas?stateId=" + id)
  }
  getBusinessType(): Observable<any>{
    return this.http.get(this.baseUrl+ '/api/Utilities/GetBusinessTypes')
  }
  verifyCode(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}api/SMSAuth/VerifyCode`, data)
  }
  resendVerificationCode(email:string): Observable<any>{
    return this.http.post(`${this.baseUrl}api/EventAuth/ResendVerificationCode`, email)
  }
  supplierLogin(data:any): Observable<any>{
    return this.http.post(this.baseUrl+ 'api/EventAuth/SupplierLogin',data)
  }

  getServiceCategories(): Observable<any>{
    return this.http.get(this.baseUrl+ 'api/EventCommon/GetServiceCategories')
  }
  getServiceTypes(id:any): Observable<any>{
    return this.http.get(this.baseUrl+ 'api/EventCommon/GetServiceTypes?categoryId='+id)
  }
  addNewService(data:any): Observable<any>{
    return this.http.post(this.baseUrl+ 'api/EventSupplier/AddNewService',data)
  }
  getSupplierService(id:number): Observable<any>{
    return this.http.get(this.baseUrl+ 'api/EventSupplier/GetSupplierServices?profileId='+id)
  }
  getSupplierService_v2(id:number): Observable<any>{
    return this.http.get(this.baseUrl+ 'api/EventSupplier/GetSupplierServices_v2?profileId='+id)
  }

  deleteSupplierService(data:any): Observable<any>{
    return this.http.post(this.baseUrl+ 'api/EventSupplier/DeleteSupplierServices', data)
  }
  getAccreditationStatus(id:number): Observable<any>{
    return this.http.get(this.baseUrl+ 'api/EventSupplier/GetAccreditationStatus?profileId='+id)
  }
  accreditationRequest(data:any): Observable<any>{
    return this.http.post(this.baseUrl+ 'api/EventSupplier/AccreditationRequest', data)
  }
  getDetailsForAccreditationRequest(id:number): Observable<any>{
    return this.http.get(this.baseUrl+ 'api/EventSupplier/GetDetailsForAccreditationRequest?profileId='+id)
  }
  getRegistrationDetail(): Observable<any>{
    return this.http.get(this.baseUrl+ '/api/EventSupplierRegistration/GetRegistrationDetails')
  }
  processRegistrationPayment(data:any): Observable<any>{
    return this.http.post(this.baseUrl+ '/api/EventSupplierRegistration/ProcessRegistrationPayment', data)
  }
  getRequests(id:number): Observable<any>{
    return this.http.get(this.baseUrl+ '/api/EventSupplier/GetRequests?profileId='+id)
  }
  getRequestDetail(id1:number, id2:number): Observable<any>{
    return this.http.get(this.baseUrl+ '/api/EventSupplier/GetRequestDetail?profileId='+id1+'&eventId='+id2)
  }
  eventRequestAction(data:any): Observable<any>{
    return this.http.post(this.baseUrl+ 'api/EventSupplier/EventRequestAction', data)
  }
  getSupplierInvoiceNumber(id:number): Observable<any>{
    return this.http.get(this.baseUrl+ 'api/EventPlanning/GetSupplierInvoiceNumber?profileId='+id)
  }
  createSupplierInvoice(data:any): Observable<any>{
    return this.http.post(this.baseUrl+ 'api/EventPlanning/CreateSupplierInvoice', data)
  }
  getSupplierInvoices(id:any): Observable<any>{
    return this.http.get(this.baseUrl+ 'api/EventPlanning/GetSupplierInvoices?profileId='+id)
  }
  getSupplierDashboard(id:number){
    return this.http.get(this.baseUrl +'api/Dashboard/GetSupplierDashboardDetails?profileId='+id)
  }
  getAccreditationPrice(): Observable<any>{
    return this.http.get(this.baseUrl+ '/api/EventSupplier/GetAccreditationPrice')
  }
  getVendorTypes(): Observable<any>{
    return this.http.get(this.baseUrl + 'api/EventSupplier/GetVendorTypes')
  }
  generateSupplierInvoiceDetails(profileId:any, eventId:any): Observable<any>{
    return this.http.get(this.baseUrl+ 'api/EventPlanning/GenerateSupplierInvoiceDetails?profileId='+profileId+'&eventId='+eventId)
  }
  getSupplierInvoiceDetails(profileId:any, invoiceId:any): Observable<any>{
    return this.http.get(this.baseUrl + 'api/EventPlanning/GetSupplierInvoiceDetails?profileId='+profileId +'&invoiceId='+invoiceId)
  }
  sendSupplierInvoice(invoiceNumber:string): Observable<any>{
    return this.http.get(this.baseUrl+ 'api/EventPlanning/SendSupplierInvoice?invoiceNumber='+invoiceNumber)
  }
  deleteSupplierInvoice(invoiceNumber:string): Observable<any>{
    return this.http.delete(this.baseUrl+ 'api/EventPlanning/DeleteSupplierInvoice?invoiceNumber='+invoiceNumber)
  }
  getBank(): Observable<any>{
    return this.http.get(this.baseUrl+ 'api/CustomerPaymentAccount/GetBanks')
  }
  createAccount(data:any): Observable<any>{
    return this.http.post(this.baseUrl+ 'api/CustomerPaymentAccount/CreateAccount',data)
  }
  

}

