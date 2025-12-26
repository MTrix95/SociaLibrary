import {Component, inject, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {MatIcon} from '@angular/material/icon';
import {NgOptimizedImage} from '@angular/common';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Modal} from '../modal/modal';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatIcon,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  standalone: true
})
export class Sidebar {
  protected readonly authService = inject(AuthService);
  protected readonly userProfile;
  protected readonly dialog = inject(MatDialog);

  private isUserInfoOpened = false;

  @Input() drawer!: MatSidenav;

  constructor() {
    this.userProfile = this.authService.getUserProfile();
  }

  logIn(): void {
    this.authService.login();
  }

  logOut(): void {
    this.authService.logOut();
  }

  get username(): string {
    return this.userProfile?.["preferred_username"] as string;
  }

  get fullName(): string {
    return this.userProfile?.["family_name"] + " " + this.userProfile?.["given_name"] as string;
  }

  get email(): string {
    return this.userProfile?.["email"] as string;
  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated() as boolean;
  }

  protected openInfo() {
    if(!this.isUserInfoOpened) {
      const dialogRef = this.dialog.open(Modal, {
        position: { left: '16rem', top: '5rem' },
        width: '480px',
        hasBackdrop: false,
        data: { title: this.username.toUpperCase() },
        panelClass: 'tw-dialog-panel',
      });

      dialogRef.afterOpened().subscribe(() =>
        this.isUserInfoOpened = true
      );

      dialogRef.afterClosed().subscribe(result => {
        this.isUserInfoOpened = false;
      });
    }


  }
}
