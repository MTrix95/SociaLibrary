import {Component, inject, input, Input, InputSignal, OnInit, output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Fieldset} from 'primeng/fieldset';
import {BookFilter} from '../../../../../shared/models/book-filter';
import {LoanStatus} from '../../../../../shared/models/book';
import {Select} from 'primeng/select';
import {Category} from '../../../../../shared/models/category';

@Component({
  selector: 'app-search-managment-form',
  imports: [
    FormsModule,
    InputText,
    Fieldset,
    ReactiveFormsModule,
    Select
  ],
  templateUrl: './search-managment-form.component.html',
  styles: ``,
})
export class SearchManagmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  protected searchForm!: FormGroup;
  protected searchFilter = output<BookFilter>();

  public cat = input<Category[]>([])
  public userID = input<string>();

  protected statusOptions: { label: string; value: LoanStatus }[] = [
    { label: 'Accettato', value: LoanStatus.ACCEPTED },
    { label: 'In attesa', value: LoanStatus.PENDING }
  ]

  ngOnInit(): void {
    // Inizializzo il fromGroup
    this.searchForm = this.fb.group({
      title: new FormControl({ value: '', disabled: false }, { validators: [] }),
      author: new FormControl({ value: '', disabled: false }, { validators: [] }),
      genre: new FormControl({ value: null, disabled: false }, { validators: [] }),
      isbn: new FormControl({ value: '', disabled: false }, { validators: [] }),
      publisher: new FormControl({ value: '', disabled: false }, { validators: [] }),
      status: new FormControl({ value: null, disabled: false }, { validators: [] })
    });
  }

  onSearch() {
    const rawValue = this.searchForm.value;
    const userID = this.userID()
    const filters: BookFilter = {...rawValue};

    if(userID) {
      filters.userID = userID;
      this.searchFilter.emit(filters);
    }
  }

  protected onReset() {
    this.searchForm.reset();
  }
}
