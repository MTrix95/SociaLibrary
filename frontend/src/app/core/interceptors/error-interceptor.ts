import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Si è verificato un errore imprevisto';

      if(error.error instanceof ErrorEvent) {
        // Errore lato client
        errorMessage = `Errore ${error.error.message}`;
      } else {
        // Errore lato server
        switch (error.status) {
          case 404:
            errorMessage = 'Risorsa non trovata';
            break;
          default:
            errorMessage = `Codice errore: ${error.status}\nMessaggio: ${error.message}`;
        }
      }

      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
