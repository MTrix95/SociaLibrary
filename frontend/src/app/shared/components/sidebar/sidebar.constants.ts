import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {FooterComponent} from '../dialog/components/footer/footer.component';

/**
 * Configurazione predefinita per le dialog aperte dalla sidebar
 */
export const DEFAULT_DIALOG_CONFIG: Partial<DynamicDialogConfig> = {
  width: '80vw',
  height: '90vh',
  position: 'topright',
  contentStyle: { 'padding': '0 24px', 'height': '100%' },
  baseZIndex: 10000,
  modal: false,
  maximizable: true,
  resizable: false,
  closable: true,
  templates: {
    footer: FooterComponent
  }
};
