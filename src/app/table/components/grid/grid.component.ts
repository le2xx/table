import { Component, Input } from '@angular/core';
import { TableItem } from "../../models/table.type";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
    @Input() table: TableItem[] | undefined | null;

}
