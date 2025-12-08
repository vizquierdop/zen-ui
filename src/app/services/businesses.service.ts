import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeadersManagerService } from '../utils/services/http-headers-manager.service';
import { ObjectToQueryParamsAdapter } from '../models/basic/object-to-query-params.adapter';
import {
  BusinessGetAllRequestDTO,
  BusinessGetAllResponseDTO,
  BusinessGetSingleResponseDTO,
  BusinessUpdateRequestDTO,
} from '../models/dtos/business.dto.models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BusinessesService {
  private readonly endpoint = 'Businesses';
  paramsAdapter = new ObjectToQueryParamsAdapter();

  constructor(
    private readonly http: HttpClient,
    private readonly httpHeadersManager: HttpHeadersManagerService
  ) {}

  getAll(request: BusinessGetAllRequestDTO): Observable<BusinessGetAllResponseDTO> {
    const convertedRequest = this.paramsAdapter.convert(request);
    return this.http.get<BusinessGetAllResponseDTO>(
      `${environment.apiUrl}/${this.endpoint}?${convertedRequest}`,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  get(id: number): Observable<BusinessGetSingleResponseDTO> {
    return this.http.get<BusinessGetSingleResponseDTO>(
      `${environment.apiUrl}/${this.endpoint}/${id}`,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  update(request: BusinessUpdateRequestDTO): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/${this.endpoint}/${request.id}`,
      request,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }
}
