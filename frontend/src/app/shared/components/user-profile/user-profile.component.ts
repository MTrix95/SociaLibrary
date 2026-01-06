import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {UserProfile} from '../../models/user-profile';
import {PrimeTemplate} from 'primeng/api';
import {UpperCasePipe} from '@angular/common';

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
        <span class="text-lg font-bold text-gray-900">Profilo - {{ user?.preferred_username | uppercase}}</span>
      </ng-template>

      <!-- CONTENT TEMPLATE -->
      <ng-template pTemplate="content">
        <div class="flex flex-col gap-6 pt-2 bg-white">
          <!-- Riga 1: Nome e Cognome -->
          <div class="flex flex-row gap-4 w-full">
            <div class="library-input-group">
              <label class="library-input-label">Nome</label>
              <input pInputText [value]="user?.given_name" readonly
                     class="library-input-field" />
            </div>
            <div class="library-input-group">
              <label class="library-input-label">Cognome</label>
              <input pInputText [value]="user?.family_name" readonly
                     class="library-input-field" />
            </div>
          </div>

          <!-- Riga 2: Email -->
          <div class="library-input-group">
            <label class="library-input-label">Indirizzo Email</label>
            <i class="pi pi-envelope"></i>
            <input pInputText [value]="user?.email" readonly class="library-input-field" />
          </div>
        </div>
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
  @Input() user: UserProfile | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();

  onClose() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
