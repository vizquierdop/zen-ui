import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpContextToken } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, catchError, of, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

export const BYPASS_LOG = new HttpContextToken(() => false);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor( private authService: AuthService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.context.get(BYPASS_LOG) === false) {
      return next.handle(request).pipe(
        catchError(err => {
          if (localStorage.getItem('zen_expireDate') && new Date() > new Date(localStorage.getItem('zen_expireDate')!)) {
            const refreshToken = localStorage.getItem('zen_refreshToken')!;
            this.authService.refresh(refreshToken)
            .pipe(
              catchError(() => {
                localStorage.removeItem('zen_accessToken');
                localStorage.removeItem('zen_refreshToken');
                localStorage.removeItem('zen_expireDate');
                void this.router.navigate(['login']);
                return EMPTY
              })
            )
            .subscribe((res) => {
              if (res) {
                let t = new Date();
                t.setSeconds(t.getSeconds() + res.expiresIn)
                localStorage.setItem("zen_accessToken", res.accessToken);
                localStorage.setItem("zen_refreshToken", res.refreshToken);
                localStorage.setItem("zen_expireDate", t.toString());
                window.location.reload();
              }
            })
          }
          return throwError(() => err);
        }),
      )
    }else{
      return next.handle(request);
    }
  }
}
