import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/entities/user.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHeadersManagerService } from '../utils/services/http-headers-manager.service';
import { UserCreateRequestDTO, UserUpdateRequestDTO } from '../models/dtos/user.dto.models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly endpoint = 'Users';
  private userSubject = new BehaviorSubject<UserModel | null>(this.getUserFromLocalStorage());

  user$ = this.userSubject.asObservable();

  constructor(private readonly http: HttpClient, private readonly httpHeadersManager: HttpHeadersManagerService) {}

  private getUserFromLocalStorage(): UserModel {
    return JSON.parse(localStorage.getItem('zen_userInfo') || 'null') as UserModel;
  }

  setUser(user: any) {
    localStorage.setItem('zen_userInfo', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout() {
    localStorage.removeItem('zen_userInfo');
    this.userSubject.next(null);
  }

  get(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(
      `${environment.apiUrl}/${this.endpoint}/${id}`,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  register(request: UserCreateRequestDTO): Observable<number> {
    return this.http.post<number>(`${environment.apiUrl}/${this.endpoint}`, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      }),
    });
  }

  update(request: UserUpdateRequestDTO): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/${this.endpoint}`,
      request,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }
}
