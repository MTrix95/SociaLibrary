import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    Toast,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
