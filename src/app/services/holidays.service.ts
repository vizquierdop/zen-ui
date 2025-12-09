import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectToQueryParamsAdapter } from '../models/basic/object-to-query-params.adapter';
import { HttpHeadersManagerService } from '../utils/services/http-headers-manager.service';
import {
  HolidayCreateRequestDTO,
  HolidayGetAllRequestDTO,
  HolidayGetAllResponseDTO,
} from '../models/dtos/holiday.dto.models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HolidaysService {
  private readonly endpoint = 'Holidays';
  paramsAdapter = new ObjectToQueryParamsAdapter();

  constructor(
    private readonly http: HttpClient,
    private readonly httpHeadersManager: HttpHeadersManagerService
  ) {}

  getAll(request: HolidayGetAllRequestDTO): Observable<HolidayGetAllResponseDTO> {
    const convertedRequest = this.paramsAdapter.convert(request);
    return this.http.get<HolidayGetAllResponseDTO>(
      `${environment.apiUrl}/${this.endpoint}?${convertedRequest}`,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  create(request: HolidayCreateRequestDTO): Observable<number> {
    return this.http.post<number>(
      `${environment.apiUrl}/${this.endpoint}`,
      request,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/${this.endpoint}/${id}`,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }
}
