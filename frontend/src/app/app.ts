import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from './shared/navbar/navbar';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent
} from '@angular/material/sidenav';
import {Sidebar} from './shared/sidebar/sidebar';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navbar,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    Sidebar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
