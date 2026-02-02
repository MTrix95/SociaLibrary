import {Component, computed, inject, OnInit, output} from '@angular/core';
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
  templateUrl: './search-form.component.html',
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
