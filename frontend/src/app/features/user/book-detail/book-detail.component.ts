import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Book} from '../../../shared/models/book'
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';

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
  ],
  templateUrl: './book-detail.component.html',
  styles: ':host { display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; }'
})
export class BookDetailComponent {
  private _config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private _ref: DynamicDialogRef = inject(DynamicDialogRef);

  protected book: Book | null = this._config.data?.book ?? null;
  protected readOnly: boolean = this._config.data?.readOnly ?? true;
}
