export interface Response<T> {
  success: boolean;
  message?: string;
  code?: string;
  errors?: Errors;
  data: T;
}


export interface Errors {
  [key: string]: string[];
}
