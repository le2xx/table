import { Component, Input } from '@angular/core';
import { ColumnSortEnum, SortOrderEnum, TableItem } from "../../models/table.type";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
    @Input() table: TableItem[] | undefined | null;

    public columnSortEnum = ColumnSortEnum;
    public sortOrderEnum = SortOrderEnum;

    public columnSort: ColumnSortEnum = ColumnSortEnum.Nomenclature;
    public sortOrder: SortOrderEnum = SortOrderEnum.Ascending;

    sortTable(table: TableItem[] | undefined | null): TableItem[] | undefined | null {
      if (!Array.isArray(table)) {
        return null;
      }

      switch (this.sortOrder) {
        case SortOrderEnum.Ascending:
          return table?.sort((a, b) =>
            b[this.columnSort] > a[this.columnSort] ? -1 : b[this.columnSort] < a[this.columnSort] ? 1 : 0);

        case SortOrderEnum.Descending:
          return table?.sort((a, b) =>
            b[this.columnSort] < a[this.columnSort] ? -1 : b[this.columnSort] > a[this.columnSort] ? 1 : 0);

        default:
          return table;
      }
    }

    onSort(columnSort: ColumnSortEnum) {
      if (columnSort === this.columnSort) {
        this.sortOrder = this.sortOrder === SortOrderEnum.Ascending ? SortOrderEnum.Descending : SortOrderEnum.Ascending;
      }
        this.columnSort = columnSort;
    }
}
