import { Component, OnInit } from '@angular/core';
import { TableHttpService } from "../../services/table.http.service";
import { DestroyService } from "../../../common/services/destroy/destroy.service";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [DestroyService]
})
export class TableComponent implements OnInit {
    getTable$ = this.dataService.getTable();

    constructor(private dataService: TableHttpService, private destroyed$: DestroyService) { }

    ngOnInit() {}
}
