import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject, takeUntil } from "rxjs";
import { FilterItem, TableFilters, TableItem } from "../models/table.type";
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

    private filters: TableFilters = {};

    constructor(private http: HttpClient, private destroyed$: DestroyService) {
        this.loadTable()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((table) => {
                this.allTable = table;
                this.initPagination();
            });
    }

    public prev() {
        if (this.currentPageIndex <= 1) {
            return;
        }

        this.currentPageIndex -= 1;
        this.currentPageIndex$.next(this.currentPageIndex);

        this.currentItems$.next(this.filterTable(this.allTable).slice(
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

        this.currentItems$.next(this.filterTable(this.allTable).slice(
          (this.currentPageIndex - 1) * this.paginationStep,
          (this.currentPageIndex - 1) * this.paginationStep + this.paginationStep
        ));
    }

    public getTable(): Observable<Array<TableItem> | undefined | null> {
        return this.currentItems$;
    }

    public setFilters(filters: TableFilters): void {
      this.filters = filters;
      this.initPagination();
    }

    private filterTable(table: TableItem[]): TableItem[] {
      let filteredTable = table;

      if (FilterItem.BrandName in this.filters) {
        filteredTable = filteredTable.filter((item) =>
          item[FilterItem.BrandName] === this.filters[FilterItem.BrandName]!);
      }

      if (FilterItem.WbRating in this.filters) {
        filteredTable = filteredTable.filter((item) =>
          item[FilterItem.WbRating] >= this.filters[FilterItem.WbRating]!);
      }

      if (FilterItem.ReviewsCount in this.filters) {
        filteredTable = filteredTable.filter((item) =>
          item[FilterItem.ReviewsCount] >= this.filters[FilterItem.ReviewsCount]!);
      }

      return filteredTable;
    }

    private loadTable(): Observable<Array<TableItem>> {
        return this.http.get<Array<TableItem>>(this.apiUrl);
    }

    private initPagination(): void {
      this.currentItems$.next(this.filterTable(this.allTable).slice(
        (this.currentPageIndex - 1) * this.paginationStep,
        (this.currentPageIndex - 1) * this.paginationStep + this.paginationStep
      ));

      this.pagesCount = Math.ceil(this.filterTable(this.allTable).length / this.paginationStep);
      this.pagesCount$.next(this.pagesCount);
      this.currentPageIndex$.next(this.currentPageIndex);
    }
}
