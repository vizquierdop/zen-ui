import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeadersManagerService } from '../utils/services/http-headers-manager.service';
import {
  AvailabilityGetAllRequestDTO,
  AvailabilityGetAllResponseDTO,
  AvailabilityUpdateRequestDTO,
  AvailabilityUpdateSingleDTO,
} from '../models/dtos/availability.dto.models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ObjectToQueryParamsAdapter } from '../models/basic/object-to-query-params.adapter';

@Injectable({
  providedIn: 'root',
})
export class AvailabilitiesService {
  private readonly endpoint = 'Availabilities';
  paramsAdapter = new ObjectToQueryParamsAdapter();

  constructor(
    private readonly http: HttpClient,
    private readonly httpHeadersManager: HttpHeadersManagerService
  ) {}

  getAll(request: AvailabilityGetAllRequestDTO): Observable<AvailabilityGetAllResponseDTO> {
    const convertedRequest = this.paramsAdapter.convert(request);
    return this.http.get<AvailabilityGetAllResponseDTO>(
      `${environment.apiUrl}/${this.endpoint}?${convertedRequest}`,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  updateSingle(request: AvailabilityUpdateSingleDTO): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/${this.endpoint}/${request.id}`,
      request,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  updateBulk(request: AvailabilityUpdateRequestDTO): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/${this.endpoint}/business/${request.businessId}`,
      request,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }
}
