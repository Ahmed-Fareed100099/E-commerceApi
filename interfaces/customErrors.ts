export interface customErrors extends Error{
  statusCode?:number;
  status?:string;

}