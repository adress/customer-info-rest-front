import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer.interface';
import { Response } from '../interfaces/response.interfaces';
import { catchError } from 'rxjs';
import { commonErrorsExcept } from '../utils/error-handler';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly baseUrl: string = 'http://127.0.0.1:8090';
  constructor(
    private http: HttpClient
  ) { }

  getCustomer(documentType: string, documentNumber: string) {
    return this.http.get<Response<Customer>>(`${this.baseUrl}/api/v1/customers`, {
      params: {
        documentType,
        documentNumber
      }
    }).pipe(catchError((err) => commonErrorsExcept(err, [404])));
  };
}

