import { Injectable } from '@angular/core';
import { ObjectToQueryParamsAdapter } from '../models/basic/object-to-query-params.adapter';
import { HttpClient } from '@angular/common/http';
import { HttpHeadersManagerService } from '../utils/services/http-headers-manager.service';
import {
  OfferedServiceCreateRequestDTO,
  OfferedServiceGetAllRequestDTO,
  OfferedServiceGetAllResponseDTO,
  OfferedServiceUpdateRequestDTO,
} from '../models/dtos/offered-service.dto.models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OfferedServiceModel } from '../models/entities/offered-service.models';

@Injectable({ providedIn: 'root' })
export class OfferedServicesService {
  private readonly enpoint = 'OfferedServices';
  paramsAdapter = new ObjectToQueryParamsAdapter();

  constructor(
    private readonly http: HttpClient,
    private readonly httpHeadersManager: HttpHeadersManagerService
  ) {}

  getAll(request: OfferedServiceGetAllRequestDTO): Observable<OfferedServiceGetAllResponseDTO> {
    const convertedRequest = this.paramsAdapter.convert(request);
    return this.http.get<OfferedServiceGetAllResponseDTO>(
      `${environment.apiUrl}/${this.enpoint}?${convertedRequest}`,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  get(id: number): Observable<OfferedServiceModel> {
    return this.http.get<OfferedServiceModel>(
      `${environment.apiUrl}/${this.enpoint}/${id}`,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  create(request: OfferedServiceCreateRequestDTO): Observable<number> {
    return this.http.post<number>(
      `${environment.apiUrl}/${this.enpoint}`,
      request,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  update(request: OfferedServiceUpdateRequestDTO): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/${this.enpoint}`,
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
