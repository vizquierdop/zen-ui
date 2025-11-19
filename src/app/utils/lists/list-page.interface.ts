export interface IListPage {
    loadData(): void;
    onSearch(): void;
    openFilterDialog(): void;
    removeFilter(field: string): void;
}