/**
 * Interfaccia per configurare un pulsante personalizzato nel footer della dialog
 */
export interface FooterButton {
  /** Etichetta */
  label: string;
  /** Icona PrimeNG da mostrare (es: 'pi pi-save') */
  icon?: string;
  /** Funzione callback da eseguire al click */
  action: () => void;
  /** Classe CSS personalizzata per il pulsante */
  cssClass?: string;
  /** Se true, il pulsante chiude la dialog dopo l'azione */
  closeOnClick?: boolean;
  /** Se true, il pulsante è disabilitato */
  disabled?: boolean;
}

/**
 * Configurazione per il footer della dialog
 */
export interface FooterConfig {
  /** Array di pulsanti personalizzati da mostrare */
  buttons?: FooterButton[];
  /** Se true, mostra il pulsante "Salva" predefinito */
  showSaveButton?: boolean;
  /** Callback per il pulsante "Salva" predefinito */
  onSave?: () => void;
  /** Se true, mostra il pulsante "Chiudi" predefinito */
  showCloseButton?: boolean;
}
