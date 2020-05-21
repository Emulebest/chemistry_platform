import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authInfo = this.auth.getAuth();
    console.log("In interceptor")
    console.log(authInfo)
    if (authInfo !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${btoa(`${authInfo.username}:${authInfo.password}`)}`
        }
      });
      return next.handle(request);
    }
    return next.handle(request)
  }
}
