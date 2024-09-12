import { Query } from 'mongoose';
import { PaginationQuery, Querystring } from './../../interfaces/features';
import { SearchQuery } from '../../interfaces/features';

class Features{
  public paginationResult:PaginationQuery;
  constructor(public mongooseQuery: Query<any[],any> , private querystring:Querystring){ }
  sort(){
    if(this.querystring.sort){
      const sortBy = this.querystring.sort.split(',').join(' ');
      this.mongooseQuery=this.mongooseQuery.sort(sortBy)
    }else{this.mongooseQuery=this.mongooseQuery.sort('-createdAt')}
    return this; 
  }
  fields(){
    if(this.querystring.fields){
      const fields = this.querystring.fields.split(',').join(' ');
      this.mongooseQuery=this.mongooseQuery.select(fields)
    }else{this.mongooseQuery = this.mongooseQuery.select('-__v')}
    return this
  }

  search(modelName:string){
    if(this.querystring.search){
      let query:SearchQuery = {}
      if(modelName=='products'){
        query.$or = [
        {name:new RegExp(this.querystring.search,'i')},
        {description:new RegExp(this.querystring.search,'i')},
        {price:new RegExp(this.querystring.search,'i')}

      ]
  }else{
    query= {name:new RegExp(this.querystring.search,'i')}
  }
  this.mongooseQuery=this.mongooseQuery.find(query);
      }
   return this;   

}

  pagination(documentsCount:number){
    const page:number = this.querystring.page ||1;
    const limit:number = this.querystring.limit || 10;
    const skip:number = (page-1)*limit;
    const endIndex:number= page*limit;
    const pagination:PaginationQuery = {}
    pagination.currentPage = Number(page);
    pagination.limit = Number(limit);
    pagination.totalPages = Math.ceil(documentsCount/limit);
    if(endIndex<documentsCount){
      pagination.next = Number(page)+1;
    }
    if(skip>0){
      pagination.prev = Number(page)-1;
    }
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }

  filter(){
    const querystringObj = {...this.querystring}
    const executedFields:string[] = ['sort','search','fields','page','limit']
    executedFields.forEach((field:string)=>{
      delete querystringObj[field] 
    })
    let queryStr:string = JSON.stringify(querystringObj)
    queryStr.replace(/\b(gte|gt|lte|lt)\b/g , match =>`$${match}`)
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr))
    return this;
  }
}
export default Features;