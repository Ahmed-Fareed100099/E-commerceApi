import { FilterData } from "./FilterData";

declare module 'express'{

  interface Request{
      FilterData?:FilterData
  }
}