export interface IListPage {
    loadData(): void;
    onSearch(): void;
    openFilterDialog(): void;
    removeFilter(): void;
}