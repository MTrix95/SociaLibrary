import {AfterViewInit, Component, effect, EventEmitter, inject, input, Input, OnInit, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {UserProfile} from '../../models/user-profile';
import {PrimeTemplate} from 'primeng/api';
import {UpperCasePipe} from '@angular/common';
import {UserProfileService} from './services/user-profile.service';
import {httpResource} from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    Dialog,
    InputText,
    PrimeTemplate,
    UpperCasePipe
  ],
  template: `
    <p-dialog
      [(visible)]="visible"
      (onHide)="onClose()"
      [modal]="false"
      [draggable]="true"
      [resizable]="false"
      [style]="{ width: '32rem' }"
      styleClass="rounded-xl! shadow-2xl! border-none! overflow-hidden! p-2!"
    >
      <!-- HEADER TEMPLATE -->
      <ng-template pTemplate="header">
        <span class="text-lg font-bold text-gray-900">Profilo</span>
      </ng-template>

      <!-- CONTENT TEMPLATE -->
      <ng-template pTemplate="content">
        @if (userProfile.isLoading()) {
          <div class="flex justify-center p-4">
            <i class="pi pi-spin pi-spinner text-2xl"></i>
          </div>
        } @else if (userProfile.value(); as user) {
          <div class="flex flex-col gap-6 pt-2 bg-white">
            <!-- Riga 1: Nome e Cognome -->
            <div class="flex flex-row gap-4 w-full">
              <div class="library-input-group">
                <label class="library-input-label">Nome</label>
                <input pInputText readonly [value]="user.name | uppercase"
                       class="library-input-field" />
              </div>
              <div class="library-input-group">
                <label class="library-input-label">Cognome</label>
                <input pInputText  readonly [value]="user.surname | uppercase"
                       class="library-input-field" />
              </div>
            </div>

            <!-- Riga 2: Email -->
            <div class="library-input-group">
              <label class="library-input-label">Indirizzo Email</label>
              <i class="pi pi-envelope"></i>
              <input pInputText  readonly [value]="user.email" class="library-input-field" />
            </div>
          </div>
        }

      </ng-template>

      <!-- FOOTER TEMPLATE -->
      <ng-template pTemplate="footer">
        <div class="flex justify-end pt-5 bg-white">
          <button
            (click)="onClose()"
            class="w-full sm:w-auto px-10 py-3 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-black cursor-pointer transition-colors active:scale-95">
            Chiudi
          </button>
        </div>
      </ng-template>
    </p-dialog>
  `,
  styles: `
  `,
})
export class UserProfileComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  private userService: UserProfileService = inject(UserProfileService);

  readonly userId = input.required<string>();
  readonly userProfile = httpResource<UserProfile>(() => {
    // Se l'id utente non è stato ancora valorizzato, esco.
    if(!this.userId()) return;

    return this.userService.findById(this.userId());
  });

  onClose() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
