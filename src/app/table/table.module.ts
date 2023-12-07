import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from "./components/table/table.component";
import { TableHttpService } from "./services/table.http.service";
import { PaginationComponent } from './components/pagination/pagination.component';
import { GridComponent } from './components/grid/grid.component';
import { DestroyService } from "../common/services/destroy/destroy.service";
import { FiltersComponent } from './components/filters/filters.component';
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        TableComponent,
        PaginationComponent,
        GridComponent,
        FiltersComponent
    ],
    exports: [
        TableComponent
    ],
  imports: [
    CommonModule,
    FormsModule
  ],
    providers: [TableHttpService, DestroyService]
})
export class TableModule { }
