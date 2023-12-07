import { Component, OnInit } from '@angular/core';
import { TableHttpService } from "../../services/table.http.service";
import { DestroyService } from "../../../common/services/destroy/destroy.service";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    providers: [DestroyService]
})
export class PaginationComponent implements OnInit {
    public currentPage$ = this.tableHttpService.currentPageIndex$
    public pagesCount$ = this.tableHttpService.pagesCount$;

    constructor(private tableHttpService: TableHttpService, private destroyed$: DestroyService) {}

    ngOnInit() {
    }

    prev() {
        this.tableHttpService.prev();
    }

    next() {
        this.tableHttpService.next();
    }
}
