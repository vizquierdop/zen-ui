import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectToQueryParamsAdapter } from '../models/basic/object-to-query-params.adapter';
import { HttpHeadersManagerService } from '../utils/services/http-headers-manager.service';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UISelectModel } from '../models/basic/ui-select.model';
import { ProvinceGetAllRequestDTO, ProvinceGetAllResponseDTO } from '../models/dtos/province.dto.models';

@Injectable({ providedIn: 'root' })
export class ProvincesService {
  private readonly endpoint = 'Provinces';
  paramsAdapter = new ObjectToQueryParamsAdapter();

  constructor(
    private readonly http: HttpClient,
    private readonly httpHeadersManager: HttpHeadersManagerService
  ) {}

  getAll(request: ProvinceGetAllRequestDTO): Observable<ProvinceGetAllResponseDTO> {
    const convertedRequest = this.paramsAdapter.convert(request);
    return this.http.get<ProvinceGetAllResponseDTO>(
      `${environment.apiUrl}/${this.endpoint}?${convertedRequest}`,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  getSelectOptions(): Observable<UISelectModel[]> {
    return this.getAll({ paginationLength: 9999 }).pipe(
      map((response) => response.items.map((x) => ({ label: x.name, value: x.id })))
    );
  }
}
