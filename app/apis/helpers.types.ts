export type PaginatedResponse<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type STDateTime = `${string}T${string}Z` | Date;

export type Error = {
  attr: string;
  code: string;
  detail: string;
};

export type ErrorResponse = Error[];
