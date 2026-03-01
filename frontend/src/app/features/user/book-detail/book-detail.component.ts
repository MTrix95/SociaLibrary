import {Component, inject, model, ModelSignal, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Book} from '../../../shared/models/book'
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {MetadataFormComponent} from './components/metadata/metadata-form.component';
import {GalleriaModule} from 'primeng/galleria';
import {BookDetailService} from './service/book-detail-service';
import {BookImage, ImageType} from '../../../shared/models/book-image';
import {MessageService} from 'primeng/api';
import {BookSearchService} from '../book-search/services/book-search.service';
import {Category} from '../../../shared/models/category';
import {forkJoin, of} from 'rxjs';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    CommonModule,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    MetadataFormComponent,
    GalleriaModule,
  ],
  templateUrl: './book-detail.component.html',
  styles: ':host { display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; }'
})
export class BookDetailComponent implements OnInit {
  private _config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private _ref: DynamicDialogRef = inject(DynamicDialogRef);
  private _service: BookDetailService = inject(BookDetailService);
  private _messageService = inject(MessageService);
  private _bookSearchService = inject(BookSearchService);


  protected readOnly: boolean = this._config.data?.readOnly ?? false;
  protected bookID: string | null = this._config.data?.bookID ?? null;

  protected book: WritableSignal<Book | null> = signal(null);
  protected images = model<BookImage[]>([]);

  public categories: WritableSignal<Category[]> = signal([]);

  @ViewChild(MetadataFormComponent)
  public metadataComp!: MetadataFormComponent;

  ngOnInit(): void {
    if(this._config.data?.footerConfig) {
      this._config.data.footerConfig.onSave = () => this.handleSave();

      const book = this.bookID ? this._service.findBook(this.bookID) : of(null);
      forkJoin({
        book: book,
        categories: this._bookSearchService.findCategories()
      }).subscribe({
        next: (results) => {
          // 1. Gestione LIBRO
          const result = results.book;
          if(result) {
            if (result.datePublished) {
              result.datePublished = new Date(result.datePublished);
            }
            this.book.set(result);

            if (result.bookImages) {
              const previews = result.bookImages.filter(img => img.type === ImageType.PREVIEW);
              this.images.set(previews);
            }
          }

          // 2. Gestione CATEGORIE
          if(results.categories) {
            this.categories.set(results.categories);
          }
        },
        error: (error) => console.error('Errore in una delle chiamate', error)
      });
    }
  }

  protected handleSave() {
    if (this.metadataComp.isFormValid()) {
      const dataToSend: FormData = this.metadataComp.formData;

      this._service.saveBook(dataToSend).subscribe({
        next: (response) => {
          this._messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Libro salvato con successo!'
          });
        },
        error: (err) => console.error('Errore durante il salvataggio', err)
      });
    }
  }

  protected get hasImages(): boolean {
    return this.images() == null || this.images().length > 0
  }
}
