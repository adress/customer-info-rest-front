import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import Swal from "sweetalert2";
import { Response } from "../interfaces/response.interfaces";

/**
 * Manage the exceptions 404, 400, 500, 422, 401 showing a message.
 * The rest of the exceptions are not handled.
 */
export const commonErrorsExcept = (err: HttpErrorResponse, excludedStatusCodes: number[] = []): Observable<never> => {
  const handledStatusCodes = [404, 400, 500, 422, 401].filter(code => !excludedStatusCodes.includes(code));
  if (handledStatusCodes.includes(err.status)) {
    const error = err.error as Response<any>;
    const errors = error.errors ? Object.values(error.errors).join('<br>') : '';
    Swal.fire(error.message, errors, 'error');
  } else {
    Swal.fire(err.name, err.message, 'error');
  }
  return throwError(() => err);
};
