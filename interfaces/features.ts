export interface Querystring{
  sort?:string;
  search?:string;
  fields?:string;
  page?: number;
  limit?: number;
  [key:string]:any;
}
export interface SearchQuery{
  $or?:Array<{[key:string]:RegExp}>;
  [key:string]:any;
}
export interface PaginationQuery{
  totalPages?:number;
  currentPage?:number;
  limit?:number
  next?:number;
  prev?:number;
}