import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {Toast} from 'primeng/toast';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    Toast,
    SidebarComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
