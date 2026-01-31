import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    SidebarComponent,
    Toast,
  ],
  providers: [ MessageService ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
