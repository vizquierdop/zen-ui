import { Injectable } from '@angular/core';
import { UIPersistentDataModel } from '../models/basic/ui-persistent-data.model';
import { UISelectedFiltersModel } from '../models/basic/ui-selected-filters.model';
import { UISearchFilterModel } from '../models/basic/ui-search-filter.model';

@Injectable({ providedIn: 'root' })
export class PersistentFiltersService {
  private sectionFilters: UIPersistentDataModel<UISelectedFiltersModel> = {};
  private searchFilters: UIPersistentDataModel<UISearchFilterModel> = {};

  readonly displayedSectionFilters = this.sectionFilters;
  readonly displayedSearchFilters = this.searchFilters;

  constructor() {}

  // MODAL FILTERS
  setSectionFilters(key: string, filters: UISelectedFiltersModel): void {
    this.sectionFilters[key] = filters;
  }

  clearSectionFilters(key: string): void {
    this.sectionFilters[key] = {};
  }

  removeSectionFilters(key: string): void {
    delete this.sectionFilters[key];
  }

  getSectionFilters(key: string): UISelectedFiltersModel {
    return this.sectionFilters[key];
  }

  // SEARCH BAR FILTER
  setSearchFilter(key: string, value: string): void {
    const searchFilter: UISearchFilterModel = { search: value };
    this.searchFilters[key] = searchFilter;
  }

  clearSearchFilter(key: string): void {
    this.searchFilters[key] = { search: '' };
  }

  removeSearchFilter(key: string): void {
    delete this.searchFilters[key];
  }

  getSearchFilter(key: string): UISearchFilterModel {
    return this.searchFilters[key];
  }
}
