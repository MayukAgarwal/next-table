export type ColData = {
  key: string;
  label: string;
  sortable?: boolean;
  filter?: {
    type: "select";
    options?: { label: string; value: string }[];
  };
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export type TableProps<T> = {
  rowData: T;
  columns: ColData[];
  onSort?: (sort: string) => void;
  onFilter?: (filter: Record<string, string>) => void;
  onPageChange?: (pageNumber: number) => void;
  loading?: boolean;
  pagination?: PaginationProps;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
};
