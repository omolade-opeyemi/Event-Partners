import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, switchMap, filter, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private http: HttpClient) { }

  baseUrl = environment['onlinePortalUrl'];
  email = environment['email'];
  password = environment['password']
  refreshToken = localStorage.getItem('refreshToken')

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService)
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 441 || error.status === 442) {
          return authService.generateAuthToken()
            .pipe(switchMap((res: any) => {
              localStorage.setItem('a-token', res.responseData.token)
              localStorage.setItem('refreshToken', res.responseData.refreshToken)

              return next.handle(req.clone({
                setHeaders: {
                  Authorization: `Bearer ${authService.getToken()}`
                }
              }));
            })
            )
        }

        return throwError(() => error);
      })
    )
  }
}
