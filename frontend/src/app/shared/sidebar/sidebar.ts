import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {MatIcon} from '@angular/material/icon';
import {NgOptimizedImage} from '@angular/common';

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
})
export class Sidebar {
  protected readonly authService = inject(AuthService);
  protected readonly userProfile;

  constructor() {
    this.userProfile = this.authService.getUserProfile();
  }

  logIn(): void {
    this.authService.login();
  }

  logOut(): void {
    this.authService.logOut();
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
}
