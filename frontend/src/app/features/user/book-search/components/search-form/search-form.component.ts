import {Component, computed, EventEmitter, inject, OnInit, output, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Fieldset} from 'primeng/fieldset';
import {DatePicker} from 'primeng/datepicker';
import {SelectButton} from 'primeng/selectbutton';
import {InputNumber} from 'primeng/inputnumber';
import {LocationService} from '../../../../../shared/components/map/services/location.service';
import {BookFilter} from '../../../../../shared/models/book-filter';

@Component({
  selector: 'app-search-form',
  imports: [
    FormsModule,
    InputText,
    Fieldset,
    DatePicker,
    SelectButton,
    InputNumber,
    ReactiveFormsModule
  ],
  template: `
    <p-fieldset
      [toggleable]="true"
      [collapsed]="false"
      legend="Filtri"
      styleClass="rounded-xl! p-2! shadow-sm! border! border-gray-100! bg-white!"
    >
      <div class="flex flex-col gap-2">
        <div class="flex justify-center">
          <p-selectbutton [options]="stateOptions()" [(ngModel)]="searchSelected" size="small" [allowEmpty]="false" unselectable="true" optionLabel="label" optionValue="value" optionDisabled="disabled"></p-selectbutton>
        </div>

        <form class="flex flex-col gap-3" [formGroup]="searchForm" (ngSubmit)="onSearch()">
          <!-- RICERCA TESTUALE -->
          @if(searchSelected === 'text') {
            <!-- Riga 1 -->
            <div class="flex flex-col md:flex-row gap-4 w-full">
              <!-- 1/3: Titolo -->
              <div class="library-input-group">
                <label class="library-input-label">Titolo Libro</label>
                <i class="pi pi-book"></i>
                <input pInputText formControlName="title" placeholder="Titolo..." class="library-input-field"/>
              </div>

              <!-- 1/3: Editore -->
              <div class="library-input-group">
                <label class="library-input-label">Editore</label>
                <i class="pi pi-building "></i>
                <input pInputText formControlName="publisher" placeholder="Casa editrice..." class="library-input-field"/>

              </div>

              <!-- 1/3: Autore -->
              <div class="library-input-group">
                <label class="library-input-label">Autore</label>
                <i class="pi pi-user"></i>
                <input pInputText formControlName="author" placeholder="Autore..." class="library-input-field"/>
              </div>
            </div>

            <!-- Riga 2: ISBN, Categoria e Anno -->
            <div class="flex flex-col md:flex-row gap-4 w-full">
              <div class="library-input-group">
                <label class="library-input-label">Codice ISBN</label>
                <i class="pi pi-barcode"></i>
                <input pInputText formControlName="isbn" placeholder="ISBN..." class="library-input-field"/>
              </div>
              <div class="library-input-group">
                <label class="library-input-label">Categoria</label>
                <i class="pi pi-tag"></i>
                <input pInputText formControlName="genre" placeholder="Genere..." class="library-input-field"/>
              </div>
              <div class="library-input-group">
                <label class="library-input-label">Data Pubblicazione</label>
                <i class="pi pi-calendar"></i>
                <p-datepicker
                  formControlName="publishedDate"
                  dateFormat="dd/mm/yy"
                  placeholder="Seleziona data"
                  [showIcon]="false"
                  appendTo="body"
                  inputStyleClass="library-input-field"></p-datepicker>
              </div>
            </div>
          } @else {
            <!-- RICERCA SPAZIALE -->
            <div class="library-input-group">
              <label class="library-input-label">Distanza da te (KM)</label>
              <i class="pi pi-map-marker"></i>
              <p-inputnumber
                formControlName="radius"
                mode="decimal"
                [min]="1"
                [max]="30"
                suffix=" km"
                placeholder="Esempio: 10 km"
                inputStyleClass="library-input-field">
              </p-inputnumber>
            </div>
          }
        </form>

        <!-- FOOTER -->
        <div class="flex justify-end gap-3 pt-4 border-t border-gray-50">
          <button (click)="onReset()"
            class="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer">
            Reset
          </button>
          <button (click)="onSearch()"
            class="px-5 py-3 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200 cursor-pointer flex items-center gap-2">
            <i class="pi pi-search"></i>
            Ricerca
          </button>
        </div>
      </div>
    </p-fieldset>
  `,
  styles: ``,
})
export class SearchFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private locationService: LocationService = inject(LocationService);

  private isLocationAvailable = computed(() => {
    return this.locationService.isLocationEnabled()
  });
  private userCoordinates = computed(() => {
    return this.locationService.userCoordinates();
  })

  protected searchForm!: FormGroup;
  protected searchSelected: string = 'text';

  protected readonly stateOptions = computed(() => [
    { label: 'Testuale', value: 'text', disabled: false },
    { label: 'Spaziale', value: 'geom', disabled: !this.isLocationAvailable() }
  ]);

  public searchFilter = output<BookFilter>();
  ngOnInit(): void {
    // Inizializzo il fromGroup
    this.searchForm = this.fb.group({
      title: new FormControl({ value: '', disabled: false }, { validators: [] }),
      author: new FormControl({ value: '', disabled: false }, { validators: [] }),
      genre: new FormControl({ value: '', disabled: false }, { validators: [] }),
      isbn: new FormControl({ value: '', disabled: false }, { validators: [] }),
      publisher: new FormControl({ value: '', disabled: false }, { validators: [] }),
      publishedDate: new FormControl({ value: null, disabled: false }, { validators: [] }),
      radius: new FormControl({ value: null, disabled: !this.isLocationAvailable() }, { validators: [] })
    });
  }

  onSearch() {
    const rawValue = this.searchForm.value;
    const filters: BookFilter = {...rawValue};

    if(this.isLocationAvailable()) {
      const coords = this.userCoordinates();
      if(coords) {
        filters.location = {...coords};
      }
    }

    console.log('filtri: ', filters);
    this.searchFilter.emit(filters);
  }

  onReset() {
    this.searchForm.reset();
  }
}
