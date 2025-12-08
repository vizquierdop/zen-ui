import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeadersManagerService } from '../utils/services/http-headers-manager.service';
import { BusinessCategoryCreateRequestDTO, BusinessCategoryDeleteRequestDTO } from '../models/dtos/business-category.dto.models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BusinessCategoriesService {
  private readonly endpoint = 'BusinessCategories';

  constructor(
    private readonly http: HttpClient,
    private readonly httpHeadersManager: HttpHeadersManagerService
  ) {}

  create(request: BusinessCategoryCreateRequestDTO): Observable<number> {
    return this.http.post<number>(
      `${environment.apiUrl}/${this.endpoint}`,
      request,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }

  // TODO Implement in API
  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/${this.endpoint}/${id}`,
      this.httpHeadersManager.generateCommonHttpOptions()
    );
  }
}
