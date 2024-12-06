import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaskThousandsDirective } from '../../directives/mask-thousands.directive';
import { BootstrapValidationClassDirective } from '../../directives/bootstrap-validation-class.directive';
import { getErrorMessage } from '../../utils/form-error-message.util';

@Component({
  selector: 'app-document-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BootstrapValidationClassDirective, MaskThousandsDirective],
  templateUrl: './document-input.component.html',
  styles: ``
})
export class DocumentInputComponent {
  private router = inject(Router);

  form = new FormGroup({
    documentType: new FormControl('', Validators.required),
    documentNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{8,11}$/),
    ]),
  });


  onSearch(): void {
    if (this.form.valid) {
      const { documentType, documentNumber } = this.form.value;
      this.router.navigate(['/summary'], {
        queryParams: { documentType, documentNumber },
      });
    }
  }

  getErrorMessage(controlName: string): string | null {
    return getErrorMessage(this.form.get(controlName), controlName);
  }

}
