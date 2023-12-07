import { Component } from '@angular/core';
import { TableHttpService } from "../../services/table.http.service";
import { TableFilters } from "../../models/table.type";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  reviewsCountOptions: number[] = [0, 10, 50, 100, 150, 200, 250, 300];
  brandNameOptions: string[] = [
    'Cathleen',
    'Carla',
    'Mayo',
    'Sherri',
    'Berry',
    'Pittman',
    'Leah',
    'Sheena',
    'Hendricks',
    'Ramsey',
    'Willis'
  ];
  filters: TableFilters = {}

  constructor(private tableHttpService: TableHttpService) {}

  public onApply() {
    this.tableHttpService.setFilters(this.filters);
  }

  public onClear() {
    this.filters = {};
    this.onApply();
  }
}
