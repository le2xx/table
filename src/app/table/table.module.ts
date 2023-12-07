import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from "./components/table/table.component";
import { TableHttpService } from "./services/table.http.service";
import { PaginationComponent } from './components/pagination/pagination.component';
import { GridComponent } from './components/grid/grid.component';
import { DestroyService } from "../common/services/destroy/destroy.service";

@NgModule({
    declarations: [
        TableComponent,
        PaginationComponent,
        GridComponent
    ],
    exports: [
        TableComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [TableHttpService, DestroyService]
})
export class TableModule { }
