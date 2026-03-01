import {Component, ElementRef, inject, Input, input, output, ViewChild} from '@angular/core';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {Tooltip} from 'primeng/tooltip';
import {Book} from '../../../../../shared/models/book';
import {DatePipe} from '@angular/common';
import {DialogService} from 'primeng/dynamicdialog';
import {BookDetailComponent} from '../../../book-detail/book-detail.component';
import {FooterComponent} from '../../../../../shared/components/dialog/components/footer/footer.component';
import {LocationService} from '../../../../../shared/components/map/services/location.service';

@Component({
  selector: 'app-book-list',
  imports: [
    TableModule,
    Tooltip,
    DatePipe,
  ],
  providers: [ DialogService ],
  templateUrl: './book-list.component.html',
  styles: ``,
})
export class BookListComponent {
  private dialogService: DialogService = inject(DialogService);
  private locationService: LocationService = inject(LocationService);

  totalRecords = input.required<number>();
  loading = input<boolean>(false);
  booksList = input.required<Book[]>();
  first = input.required<number>();

  public onLazyLoad = output<TableLazyLoadEvent>();

  public handleLazyLoad(event: TableLazyLoadEvent) {
    this.onLazyLoad.emit(event);
  }

  protected zoomTo(lat: number, lon: number) {
    if (lon && lat) {
      this.locationService.zoomTo(lat, lon);
    }
  }

  protected onOpenDetail(bookID: string) {
    this.dialogService.open(BookDetailComponent, {
      header: 'Dettaglio',
      data: {
        // Passo l'oggetto selezionato alla modale
        bookID,
        readOnly: true,
        footerConfig: {
          showSaveButton: false,
          showCloseButton: true,
          buttons: [
            {
              label: 'Conferma',
              icon: 'pi pi-check',
              action: () => {
                console.log('Conferma...');
              },
              closeOnClick: true // Chiude la dialog dopo l'azione
            }
          ]
        }
      },
      width: '80vw',      // Larghezza ampia dato che contiene ricerca e lista
      height: '90vh',     // Altezza quasi a tutto schermo
      contentStyle: {
        'padding': '0 1.5rem',
        'display': 'flex',
        'flex-direction': 'column',
        'height': '100%'
      },
      position: 'topright', // Verrà posizionato al centro della pagina
      baseZIndex: 10000,
      modal: false, // Evito che ci sia l'overlay dietro alla modale
      maximizable: true,   // Permette all'utente di espandere la
      resizable: false, // Non permette all'utente di ridimensionare la modale
      closable: true,
      templates: {
        footer: FooterComponent
      }
    });
  }
}
