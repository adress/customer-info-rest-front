import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryComponent } from './summary.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { Customer } from '../../interfaces/customer.interface';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let router: Router;
  let customerService: CustomerService;

  beforeEach(async () => {
    const routerSpy = { navigate: jest.fn() };
    const customerServiceSpy = {
      getCustomer: jest.fn().mockReturnValue(of({ data: { firstName: 'John', lastName: 'Doe', phone: '1234567890', address: '123 Main St', city: 'Anytown' } }))
    };
    const activatedRouteStub = {
      queryParams: of({ documentType: 'C', documentNumber: '12345678' })
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, SummaryComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CustomerService, useValue: customerServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    customerService = TestBed.inject(CustomerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with customer data', () => {
    expect(customerService.getCustomer).toHaveBeenCalledWith('C', '12345678');
    expect(component.clientData).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      address: '123 Main St',
      city: 'Anytown'
    });
  });

  it('should navigate back on onBack', () => {
    component.onBack();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
