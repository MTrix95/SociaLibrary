import {Component, computed, inject, input, InputSignal, Signal, signal, WritableSignal} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-footer',
  template: `
    <div class="flex flex-row bg-white gap-2">
      @if (isSaveEnabled) {
        <button class="px-5 py-3 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200 cursor-pointer flex items-center gap-2">
          <i class="pi pi-save"></i>
          Salva
        </button>
      }
      <button (click)="onCloseHandler()"
              class="px-5 py-3 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200 cursor-pointer flex items-center gap-2">
        <i class="pi pi-times"></i>
        Chiudi
      </button>
    </div>
  `,
  styles: ``,
})
export class FooterComponent {
  private _ref: DynamicDialogRef = inject(DynamicDialogRef);
  private _config: DynamicDialogConfig = inject(DynamicDialogConfig);

  protected onCloseHandler() {
    this._ref.close();
  }

  get isSaveEnabled() {
    return this._config.data.isSaveEnabled || false;
  }
}
