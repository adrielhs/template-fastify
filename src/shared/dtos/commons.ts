export interface IPagination {
  limit: number
  page: number
}

export enum IDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface IOrderBy {
  direction: IDirection
  orderBy: string
}
