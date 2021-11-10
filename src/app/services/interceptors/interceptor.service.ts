import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
 
  constructor( private router:Router, private loginService: LoginService , private message:NzMessageService ) { }
 
  intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {
    const token = this.loginService.getCurrentSessionToken();
    // console.log( "Token in Interceptor : " + token );

    const optionRequete = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        Authorization: `${token}` 
      })
    };

    const clonedRequest = req.clone({
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        Authorization: `${token}` 
      })
  });
  // console.log("new headers", clonedRequest.headers.keys());
  return next.handle(clonedRequest).pipe(
    catchError(
      (err,caught) => {
        if ( err.status===401 ) {
          this.handleAuthError();
          this.message.error("Session Expirée. Merci de vous reconnecter. " );
          return of(err);
        }
        throw err;
      }
    )
  );

  }


  private handleAuthError() {
    this.loginService.logOut();
    this.router.navigateByUrl('/');
  }

  
}
