import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectToQueryParamsAdapter } from '../models/basic/object-to-query-params.adapter';
import { HttpHeadersManagerService } from '../utils/services/http-headers-manager.service';
import {
  CategoryGetAllRequestDTO,
  CategoryGetAllResponseDTO,
} from '../models/dtos/category.dto.models';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UISelectModel } from '../models/basic/ui-select.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly endpoint = 'Categories';
  paramsAdapter = new ObjectToQueryParamsAdapter();

  constructor(
    private readonly http: HttpClient,
    private readonly httpHeadersManager: HttpHeadersManagerService
  ) {}

  getAll(request: CategoryGetAllRequestDTO): Observable<CategoryGetAllResponseDTO> {
    const convertedRequest = this.paramsAdapter.convert(request);
    return this.http.get<CategoryGetAllResponseDTO>(
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
