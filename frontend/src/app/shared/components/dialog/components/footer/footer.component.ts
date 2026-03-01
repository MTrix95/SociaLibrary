import {Component, computed, inject, Signal} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FooterButton, FooterConfig} from '../../interfaces/footer-button.interface';

@Component({
  selector: 'app-footer',
  template: `
    <div class="flex flex-row bg-white gap-2 justify-end">
      <!-- Pulsanti personalizzati -->
      @for (button of customButtons(); track button.label) {
        <button
          [disabled]="button.disabled"
          [class]="button.cssClass || 'library-button-primary'"
          (click)="onButtonClick(button)">
          @if (button.icon) {
            <i [class]="button.icon"></i>
          }
          {{ button.label }}
        </button>
      }

      <!-- Pulsante Salva predefinito -->
      @if (showSaveButton()) {
        <button
          [disabled]="isSaveDisabled()"
          (click)="onSaveHandler()"
          class="library-button-primary">
          <i class="pi pi-save"></i>
          Salva
        </button>
      }

      <!-- Pulsante Chiudi predefinito -->
      @if (showCloseButton()) {
        <button
          (click)="onCloseHandler()"
          class="library-button-primary">
          <i class="pi pi-times"></i>
          Chiudi
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class FooterComponent {
  private _ref: DynamicDialogRef = inject(DynamicDialogRef);
  private _config: DynamicDialogConfig = inject(DynamicDialogConfig);

  /**
   * Configurazione del footer dalla dialog config
   */
  private footerConfig: Signal<FooterConfig> = computed(() => {
    return this._config.data?.footerConfig || {};
  });

  /**
   * Pulsanti personalizzati da mostrare
   */
  protected customButtons: Signal<FooterButton[]> = computed(() => {
    return this.footerConfig().buttons || [];
  });

  /**
   * Se true, mostra il pulsante "Salva" predefinito
   */
  protected showSaveButton: Signal<boolean> = computed(() => {
    const config = this.footerConfig();
    return config.showSaveButton ?? false;
  });

  /**
   * Se true, mostra il pulsante "Chiudi" predefinito
   */
  protected showCloseButton: Signal<boolean> = computed(() => {
    const config = this.footerConfig();
    return config.showCloseButton ?? true;
  });

  /**
   * Se true, il pulsante Salva è disabilitato
   */
  protected isSaveDisabled: Signal<boolean> = computed(() => {
    return this._config.data?.isSaveDisabled || false;
  });

  /**
   * Gestisce il click su un pulsante personalizzato
   */
  protected onButtonClick(button: FooterButton): void {
    if (button.disabled) {
      return;
    }

    button.action();

    if (button.closeOnClick) {
      this._ref.close();
    }
  }

  /**
   * Gestisce il click sul pulsante Salva predefinito
   */
  protected onSaveHandler(): void {
    const config = this.footerConfig();
    if (config.onSave) {
      config.onSave();
    }
  }

  /**
   * Gestisce il click sul pulsante Chiudi
   */
  protected onCloseHandler(): void {
    this._ref.close();
  }
}
