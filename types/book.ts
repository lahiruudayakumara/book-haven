export interface IBook {
  _id: string;
  Title: string;
  Price: GLfloat;
  DiscountPrice: GLfloat;
  Category: string;
  Writer: string;
  BookURL: string;
  ImageURL: string;
  Description: string;
}

export interface IPostBook {
  category?: string,
  page?: number,
  limit?: number
  keyword?: string
}

export interface IGetBooK {
  books: IBook[],
  currentPage: number,
  totalCount: number,
  totalPages: number
}

export interface IBookWriter {
  [x: string]: any;
  _id: string;
  name: string;
}
