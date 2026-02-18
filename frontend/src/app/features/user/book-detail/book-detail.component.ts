import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Book} from '../../../shared/models/book'

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './book-detail.component.html',
})
export class BookDetailComponent {
  private _config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private _ref: DynamicDialogRef = inject(DynamicDialogRef);

  protected book: Book | null = this._config.data?.book ?? null;
  protected readOnly: boolean = this._config.data?.readOnly ?? true;
}
