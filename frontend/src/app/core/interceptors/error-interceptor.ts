import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {MessageService} from 'primeng/api';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Si è verificato un errore imprevisto';

      const errorMap: Record<number, string> = {
        401: 'Sessione scaduta. Effettua nuovamente il login.',
        403: 'Non hai i permessi per questa operazione.',
        404: 'Risorsa non trovata.',
        500: 'Errore interno del server.\nMotivo: ' + error.error
      };

      errorMessage = errorMap[error.status] || errorMessage;

      messageService.add({ severity: 'error', summary: 'Errore', detail: errorMessage });
      return throwError(() => new Error(errorMessage));
    })
  );
};
