import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentInputComponent } from './document-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BootstrapValidationClassDirective } from '../../directives/bootstrap-validation-class.directive';
import { MaskThousandsDirective } from '../../directives/mask-thousands.directive';
import { getErrorMessage } from '../../utils/form-error-message.util';
import { of } from 'rxjs';

describe('DocumentInputComponent', () => {
  let component: DocumentInputComponent;
  let fixture: ComponentFixture<DocumentInputComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        BootstrapValidationClassDirective,
        MaskThousandsDirective,
        DocumentInputComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentInputComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const form = component.form;
    expect(form.get('documentType')?.value).toBe('');
    expect(form.get('documentNumber')?.value).toBe('');
  });

  it('should validate the form fields', () => {
    const form = component.form;
    const documentType = form.get('documentType');
    const documentNumber = form.get('documentNumber');

    documentType?.setValue('');
    documentNumber?.setValue('');
    expect(documentType?.valid).toBe(false);
    expect(documentNumber?.valid).toBe(false);

    documentType?.setValue('C');
    documentNumber?.setValue('12345678');
    expect(documentType?.valid).toBe(true);
    expect(documentNumber?.valid).toBe(true);
  });

  it('should navigate to summary on valid form submission', () => {
    const form = component.form;
    form.get('documentType')?.setValue('C');
    form.get('documentNumber')?.setValue('12345678');

    component.onSearch();

    expect(router.navigate).toHaveBeenCalledWith(['/summary'], {
      queryParams: { documentType: 'C', documentNumber: '12345678' }
    });
  });

  it('should not navigate on invalid form submission', () => {
    const form = component.form;
    form.get('documentType')?.setValue('');
    form.get('documentNumber')?.setValue('');

    component.onSearch();

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should return error message for invalid control', () => {
    const form = component.form;
    const documentNumber = form.get('documentNumber');
    documentNumber?.setValue('');
    documentNumber?.markAsTouched();

    const errorMessage = component.getErrorMessage('documentNumber');
    expect(errorMessage).toBe('El número de documento es obligatorio.');
  });
});
