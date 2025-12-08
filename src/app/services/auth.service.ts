import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginRequestDTO } from '../models/dtos/user.dto.models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly endpoint = 'Auth';

  constructor(private readonly http: HttpClient) {}

  login(request: UserLoginRequestDTO): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.endpoint}/login`,
      request,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
        }),
      }
    );
  }

  refresh(refreshToken: string): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.endpoint}/refresh`,
      { refreshToken: refreshToken },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
        }),
      }
    );
  }
}
