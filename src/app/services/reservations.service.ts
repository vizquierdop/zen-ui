import { Injectable } from '@angular/core';
import { ObjectToQueryParamsAdapter } from '../models/basic/object-to-query-params.adapter';
import { HttpClient } from '@angular/common/http';
import {
  ReservationCreateRequestDTO,
  ReservationGetAllRequestDTO,
  ReservationGetAllResponseDTO,
  ReservationUpdateRequestDTO,
} from '../models/dtos/reservation.dto.models';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeadersManagerService } from '../utils/services/http-headers-manager.service';
import { ReservationModel } from '../models/entities/reservation.models';

@Injectable({ providedIn: 'root' })
export class ReservationsService {
  private readonly enpoint = 'Reservations';
  paramsAdapter = new ObjectToQueryParamsAdapter();

  constructor(
    private readonly http: HttpClient,
    private readonly httpHeadersManager: HttpHeadersManagerService
  ) {}

  getAll(request: ReservationGetAllRequestDTO): Observable<ReservationGetAllResponseDTO> {
    const convertedRequest = this.paramsAdapter.convert(request);
    return this.http.get<ReservationGetAllResponseDTO>(
      `${environment.apiUrl}/${this.enpoint}?${convertedRequest}`,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  get(id: number): Observable<ReservationModel> {
    return this.http.get<ReservationModel>(
      `${environment.apiUrl}/${this.enpoint}/${id}`,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  create(request: ReservationCreateRequestDTO): Observable<number> {
    return this.http.post<number>(
      `${environment.apiUrl}/${this.enpoint}`,
      request,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  update(request: ReservationUpdateRequestDTO): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/${this.enpoint}/${request.id}`,
      request,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/${this.enpoint}/${id}`,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }
}
