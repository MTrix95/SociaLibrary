import {Component, inject} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';


@Component({
  selector: 'app-book-management',
  imports: [

  ],
  providers: [ DialogService ],
  template: `
    <div class="flex flex-col h-full max-h-[calc(90vh-120px)] bg-white">
      <!-- Sezione Contenuto Scorrevole -->
      <div class="flex-1 overflow-y-auto pr-2 flex flex-col gap-6 pt-2">
        <!-- Sezione Ricerca -->
        <div class="flex flex-col gap-1.5 w-full">
          <label class="text-gray-400 text-[10px] uppercase font-bold ml-1 tracking-widest">Ricerca Libri</label>

        </div>

        <!-- Sezione Lista/Tabella -->
        <div class="flex flex-col gap-1.5 w-full mb-4">
          <label class="text-gray-400 text-[10px] uppercase font-bold ml-1 tracking-widest">Risultati</label>
          <div class="rounded-xl border border-gray-100 overflow-hidden shadow-sm">

          </div>
        </div>
      </div>

      <!-- Footer Fisso (Sempre visibile in fondo) -->
      <div class="flex justify-end pt-6 pb-2 bg-white border-t border-gray-50 shrink-0">
        <button
          (click)="close()"
          class="w-full sm:w-auto px-10 py-3 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-black cursor-pointer transition-colors active:scale-95">
          Chiudi
        </button>
      </div>
    </div>
  `,
})
export class BookManagementComponent {
  private ref = inject(DynamicDialogRef);

  close() {
    this.ref.close();
  }
}
