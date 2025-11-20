import {Component, Input} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from '@angular/material/icon';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  imports: [
    MatIcon,
    MatIconButton,
    MatToolbar,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly title = "Social Library";

  @Input() drawer!: MatDrawer;
  constructor() {
  }
}
