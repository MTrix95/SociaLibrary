/**
 * Esempi di utilizzo del FooterComponent customizzabile
 * 
 * Questo file mostra come configurare i pulsanti personalizzati nel footer delle dialog PrimeNG
 */

import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {FooterButton, FooterConfig} from '../interfaces/footer-button.interface';
import {FooterComponent} from '../components/footer/footer.component';

/**
 * Esempio 1: Usare solo pulsanti predefiniti (retrocompatibile)
 */
export const example1_DefaultButtons: Partial<DynamicDialogConfig> = {
  header: 'Esempio Dialog',
  templates: {
    footer: FooterComponent
  },
  data: {
    // Mantiene retrocompatibilità con il vecchio sistema
    isSaveEnabled: true,
    // Oppure usa la nuova configurazione
    footerConfig: {
      showSaveButton: true,
      showCloseButton: true,
      onSave: () => {
        console.log('Salvataggio...');
      }
    }
  }
};

/**
 * Esempio 2: Pulsanti completamente personalizzati
 */
export const example2_CustomButtons: Partial<DynamicDialogConfig> = {
  header: 'Dialog con pulsanti personalizzati',
  templates: {
    footer: FooterComponent
  },
  data: {
    footerConfig: {
      showCloseButton: true, // Mantieni il pulsante Chiudi predefinito
      buttons: [
        {
          label: 'Elimina',
          icon: 'pi pi-trash',
          cssClass: 'px-5 py-3 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-200 cursor-pointer flex items-center gap-2',
          action: () => {
            console.log('Eliminazione...');
            // Logica di eliminazione
          },
          closeOnClick: false
        },
        {
          label: 'Modifica',
          icon: 'pi pi-pencil',
          action: () => {
            console.log('Modifica...');
            // Logica di modifica
          },
          closeOnClick: false
        },
        {
          label: 'Conferma e Chiudi',
          icon: 'pi pi-check',
          action: () => {
            console.log('Conferma...');
            // Logica di conferma
          },
          closeOnClick: true // Chiude la dialog dopo l'azione
        }
      ]
    }
  }
};

/**
 * Esempio 3: Mix di pulsanti predefiniti e personalizzati
 */
export const example3_MixedButtons: Partial<DynamicDialogConfig> = {
  header: 'Dialog con mix di pulsanti',
  templates: {
    footer: FooterComponent
  },
  data: {
    footerConfig: {
      showSaveButton: true,
      showCloseButton: true,
      onSave: () => {
        console.log('Salvataggio personalizzato...');
        // Logica di salvataggio personalizzata
      },
      buttons: [
        {
          label: 'Anteprima',
          icon: 'pi pi-eye',
          action: () => {
            console.log('Mostra anteprima...');
          },
          closeOnClick: false
        }
      ]
    }
  }
};

/**
 * Esempio 4: Pulsanti con stato disabilitato
 */
export const example4_DisabledButtons: Partial<DynamicDialogConfig> = {
  header: 'Dialog con pulsanti disabilitati',
  templates: {
    footer: FooterComponent
  },
  data: {
    footerConfig: {
      showSaveButton: true,
      showCloseButton: true,
      buttons: [
        {
          label: 'Azione Disabilitata',
          icon: 'pi pi-lock',
          disabled: true, // Pulsante disabilitato
          action: () => {
            // Non verrà eseguita perché disabilitato
          }
        }
      ]
    },
    isSaveDisabled: true // Disabilita anche il pulsante Salva predefinito
  }
};
