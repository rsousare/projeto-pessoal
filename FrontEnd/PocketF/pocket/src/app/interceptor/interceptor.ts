import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../components/services/auth.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = localStorage.getItem('authToken');
    //console.log('Credenciais geradas: ', auth);

    if (auth) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Basic ${auth}`
        }
      });
      //console.log(cloned.headers.get('Authorization'));
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}



export const InterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  }
]
