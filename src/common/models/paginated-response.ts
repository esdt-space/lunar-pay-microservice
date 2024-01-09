import PaginationParams from '@/common/models/pagination.params.model';

type PaginationMeta = {
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  totalPages: number;
}

export class PaginatedResponse<T> {
  public data: T[];
  public meta: PaginationMeta;

  constructor(data: T[], totalRecords: number, pagination: PaginationParams) {
    this.data = data;

    const currentPage = pagination.skip / pagination.limit;
    const numberOfPages = Math.ceil(totalRecords / pagination.limit);

    this.meta = {
      pageSize: pagination.limit,
      currentPage: currentPage,
      totalRecords: totalRecords,
      totalPages: numberOfPages,
    };
  }
}