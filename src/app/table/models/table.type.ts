export interface TableItem {
  "id": string;
  "wbRating": number;
  "reviewsCount": number;
  "nomenclature": number;
  "sku": string;
  "name": string;
  "brandName": string;
  "brandId": string;
  "image": string;
  "preview": string;
  "ordered": number;
  "soldQuantity": number;
  "soldAmount": number;
  "orderedAmount": number;
  "availability": number;
}

export enum ColumnSortEnum {
  Nomenclature = 'nomenclature',
  Sku = 'sku',
  Name = 'name',
  BrandName = 'brandName',
  WbRating = 'wbRating',
  ReviewsCount = 'reviewsCount',
  Ordered = 'ordered'
}

export enum SortOrderEnum {
  Ascending = 'ascending',
  Descending = 'descending'
}
