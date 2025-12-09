import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { UserLoginRequestDTO, UserLoginResponseDTO } from '../models/dtos/user.dto.models';
import { environment } from '../../environments/environment';
import { BYPASS_LOG } from '../utils/interceptors/auth-interceptor';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly endpoint = 'Auth';

  constructor(private readonly http: HttpClient) {}

  login(request: UserLoginRequestDTO): Observable<UserLoginResponseDTO> {
    return this.http.post<UserLoginResponseDTO>(
      `${environment.apiUrl}/${this.endpoint}/login`,
      request,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
        }),
        context: new HttpContext().set(BYPASS_LOG, true),
      }
    );
  }

  refresh(refreshToken: string): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.endpoint}/refresh`,
      { token: refreshToken },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
        }),
        context: new HttpContext().set(BYPASS_LOG, true),
      }
    );
  }
}
