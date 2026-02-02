import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { TabsModule } from 'primeng/tabs';
import {TableModule} from 'primeng/table';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-book-management',
  imports: [
    TabsModule,
    TableModule,
    DatePipe,
  ],
  providers: [ DialogService ],
  templateUrl: './book-management.component.html',
})
export class BookManagementComponent {

  protected onOpenDetail(book: any) {

  }
}
