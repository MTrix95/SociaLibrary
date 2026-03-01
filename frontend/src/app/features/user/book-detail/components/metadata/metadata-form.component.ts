import {
  Component,
  computed,
  effect,
  inject,
  Input,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {Fieldset} from 'primeng/fieldset';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePicker} from 'primeng/datepicker';
import {InputText} from 'primeng/inputtext';
import {Book} from '../../../../../shared/models/book';
import {Textarea} from 'primeng/textarea';
import {FileUpload} from 'primeng/fileupload';
import {Checkbox} from 'primeng/checkbox';
import {LocationService} from '../../../../../shared/components/map/services/location.service';
import {Category} from '../../../../../shared/models/category';
import {Select} from 'primeng/select';
import {MultiSelect} from 'primeng/multiselect';


@Component({
  selector: 'app-metadata-form',
  imports: [
    ScrollPanelModule,
    Fieldset,
    FormsModule,
    ReactiveFormsModule,
    DatePicker,
    InputText,
    Textarea,
    FileUpload,
    Checkbox,
    Select,
    MultiSelect
  ],
  templateUrl: './metadata-form.component.html',
})
export class MetadataFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private _locationService = inject(LocationService);

  private coverFile: File | null = null;
  private previewFiles: File[] | null = null;

  private isLocationAvailable = computed(() => {
    return this._locationService.isLocationEnabled()
  });
  private userCoordinates = computed(() => {
    return this._locationService.userCoordinates();
  })

  protected metadataForm!: FormGroup;

  public bookDetail: InputSignal<Book | null> = input.required();
  public isReadOnly: InputSignal<boolean> = input.required();

  public cat = input<Category[]>([]);
  constructor() {
    effect(() => {
      const data = this.bookDetail();
      const isReadOnly = this.isReadOnly();
      const locationEnabled = this.isLocationAvailable();

      if (data) {
        // 1. Applichiamo i valori
        this.metadataForm.patchValue({
          ...data,
          chkCoordinate: !!(data.latitude && data.longitude)
        }, { emitEvent: false });

        // 2. Gestiamo l'abilitazione globale
        if (isReadOnly) {
          this.metadataForm.disable({ emitEvent: false });
        } else {
          this.metadataForm.enable({ emitEvent: false });

          if (!locationEnabled) {
            this.metadataForm.get('coordinate')?.disable({ emitEvent: false });
          }
        }
      } else {
        this.metadataForm.reset();
      }
    });
  }

  ngOnInit(): void {
    this.metadataForm = this.fb.group({
      id: new FormControl({ value: '', disabled: false }, { validators: [] }),
      title: new FormControl({ value: '', disabled: false }, { validators: [Validators.required] }),
      author: new FormControl({ value: '', disabled: false }, { validators: [Validators.required] }),
      categories: new FormControl({ value: [], disabled: false }, { validators: [Validators.required] }),
      isbn: new FormControl({ value: '', disabled: false }, { validators: [Validators.required] }),
      publisher: new FormControl({ value: '', disabled: false }, { validators: [Validators.required] }),
      datePublished: new FormControl({ value: '', disabled: false }, { validators: [Validators.required] }),
      description: new FormControl({ value: '', disabled: false }, { validators: [] }),
      fileCover: new FormControl({ value: null, disabled: false }, { validators: [] }),
      filesPreview: new FormControl({ value: null, disabled: false }, { validators: [] }),
      chkCoordinate: new FormControl({ value: false, disabled: false }, { validators: [] }),
      latitude: new FormControl({ value: '', disabled: false }, { validators: [] }),
      longitude: new FormControl({ value: '', disabled: false }, { validators: [] })
    });
  }

  public isFormValid(): boolean {
    return this.metadataForm.valid;
  }

  public get formData(): FormData {
    const formData = new FormData();
    const rawValues = this.metadataForm.getRawValue();

    debugger;
    const { fileCover, filesPreview, chkCoordinate, ...bookData } = rawValues;

    // 1. Metadati JSON
    formData.append("book", new Blob([JSON.stringify(bookData)], { type: 'application/json' }));

    // 2. Copertina
    if (this.coverFile) {
      formData.append("cover", this.coverFile);
    }

    // 3. Anteprime
    if (this.previewFiles && this.previewFiles.length > 0) {
      for (const file of this.previewFiles) {
        formData.append("previews", file);
      }
    }

    return formData;
  }

  protected handleGeoLocation(event: any) {
    if(event.checked) {
      const location = this.userCoordinates();
      if(location) {
        this.metadataForm.patchValue({
          latitude: this._locationService.applyPrivacyCoordiante(location.coordinates[0],2),
          longitude: this._locationService.applyPrivacyCoordiante(location.coordinates[1], 2)
        })
      }
    } else {
      this.metadataForm.patchValue({
        latitude: null,
        longitude: null
      })
    }
  }

  protected onFileSelect(event: any, field: string) {
    const files = event.files as File[];

    if (field === 'cover') {
      // 1. Salviamo il file binario per il FormData
      this.coverFile = files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.coverFile);
      reader.onload = () => {
        this.metadataForm.patchValue({ fileCover: reader.result });
      };
    }
    else if (field === 'previews') {
      // 1. Salviamo i file binari (max 5)
      this.previewFiles = Array.from(files).slice(0, 5);

      // 2. Trasformo l'array in Base64 per il FormControl
      const base64Array: string[] = [];
      this.previewFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          base64Array.push(reader.result as string);

          // Aggiorniamo il form solo quando tutti i file sono stati letti
          if (base64Array.length === this.previewFiles?.length) {
            this.metadataForm.patchValue({ filesPreview: base64Array });
          }
        };
      });
    }
  }
}
