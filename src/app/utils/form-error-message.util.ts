import { AbstractControl } from '@angular/forms';

/**
 * Returns the error message for a specific form control.
 * @param control - The form control being validated.
 * @param controlName - The name of the control (used for custom messages).
 */
export function getErrorMessage(control: AbstractControl | null, controlName: string): string | null {
  if (control && control.invalid && control.touched) {
    if (control.hasError('required')) {
      return `${getFieldLabel(controlName)} es obligatorio.`;
    }

    if (control.hasError('pattern') && controlName === 'documentNumber') {
      return `${getFieldLabel(controlName)} debe tener entre 8 y 11 dígitos.`;
    }
  }

  return null;
}

/**
 * Returns a user-friendly label for the name of a control.
 * @param controlName - The name of the control.
 */
function getFieldLabel(controlName: string): string {
  const labels: { [key: string]: string } = {
    documentType: 'El tipo de documento',
    documentNumber: 'El número de documento',
  };

  return labels[controlName] || 'Este campo';
}
