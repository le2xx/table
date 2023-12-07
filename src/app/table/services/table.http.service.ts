import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject, takeUntil } from "rxjs";
import { TableItem } from "../models/table.type";
import { DestroyService } from "../../common/services/destroy/destroy.service";

@Injectable()
export class TableHttpService {
    public currentPageIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
    public pagesCount$: BehaviorSubject<number> = new BehaviorSubject(0);

    private apiUrl = 'assets/data.json';
    private allTable: TableItem[] = [];
    private currentItems$: Subject<Array<TableItem> | undefined | null> = new Subject();
    private paginationStep: number = 5;

    private currentPageIndex = 1;
    private pagesCount = 0;

    constructor(private http: HttpClient, private destroyed$: DestroyService) {
        this.loadTable()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((table) => {
                this.allTable = table;
                this.currentItems$.next(this.allTable.slice(
                  (this.currentPageIndex - 1) * this.paginationStep,
                  (this.currentPageIndex - 1) * this.paginationStep + this.paginationStep
                ));

                this.pagesCount = Math.ceil(table.length / this.paginationStep);
                this.pagesCount$.next(this.pagesCount);
                this.currentPageIndex$.next(this.currentPageIndex);
            });
    }

    public prev() {
        if (this.currentPageIndex <= 1) {
            return;
        }

        this.currentPageIndex -= 1;
        this.currentPageIndex$.next(this.currentPageIndex);

        this.currentItems$.next(this.allTable.slice(
          (this.currentPageIndex - 1) * this.paginationStep,
          (this.currentPageIndex - 1) * this.paginationStep + this.paginationStep
        ));
    }

    public next() {
        if (this.currentPageIndex >= this.pagesCount) {
            return;
        }

        this.currentPageIndex += 1;
        this.currentPageIndex$.next(this.currentPageIndex);

        this.currentItems$.next(this.allTable.slice(
          (this.currentPageIndex - 1) * this.paginationStep,
          (this.currentPageIndex - 1) * this.paginationStep + this.paginationStep
        ));
    }

    public getTable(): Observable<Array<TableItem> | undefined | null> {
        return this.currentItems$;
    }

    private loadTable(): Observable<Array<TableItem>> {
        return this.http.get<Array<TableItem>>(this.apiUrl);
    }
}
