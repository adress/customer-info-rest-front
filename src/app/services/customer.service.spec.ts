import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';
import { Customer } from '../interfaces/customer.interface';
import { Response } from '../interfaces/response.interfaces';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });

    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch customer data', () => {
    const mockResponse: Response<Customer> = {
      success: true,
      data: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        address: '123 Main St',
        city: 'Anytown'
      }
    };

    service.getCustomer('C', '12345678').subscribe((response) => {
      expect(response.data).toEqual(mockResponse.data);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/api/v1/customers?documentType=C&documentNumber=12345678`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle errors', () => {
    const mockErrorResponse = {
      status: 404,
      statusText: 'Not Found'
    };

    service.getCustomer('C', '12345678').subscribe(
      () => fail('should have failed with 404 error'),
      (error) => {
        expect(error.status).toBe(404);
      }
    );

    const req = httpMock.expectOne(`${service['baseUrl']}/api/v1/customers?documentType=C&documentNumber=12345678`);
    expect(req.request.method).toBe('GET');
    req.flush(null, mockErrorResponse);
  });
});
