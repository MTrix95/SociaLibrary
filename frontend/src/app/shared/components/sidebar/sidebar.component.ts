import {Component, computed, inject, Signal, WritableSignal} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {DrawerModule} from 'primeng/drawer';
import {MenuItem, MenuItemCommandEvent, PrimeIcons} from 'primeng/api';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {UserProfile} from '../../models/user-profile';
import {UserProfileComponent} from '../user-profile/user-profile.component';
import {BookManagementComponent} from '../../../features/user/book-management/book-management.component';
import {DialogService} from 'primeng/dynamicdialog';
import {BookSearchComponent} from '../../../features/user/book-search/book-search.component';
import {DEFAULT_DIALOG_CONFIG} from './sidebar.constants';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    DrawerModule,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    UserProfileComponent
  ],
  providers: [ DialogService ],
  template: `
    <!-- Sidebar -->
    <aside
      class="w-20 lg:w-64 flex flex-col h-screen bg-gray-900 text-gray-300 border-r border-gray-800 overflow-hidden transition-all duration-300">

      <!-- Header -->
      <header class="flex items-center justify-center p-4 lg:p-6 border-b border-gray-800 shrink-0">
        <img ngSrc="/logo.png" priority="" alt="Logo" class="w-12 h-12 lg:w-32 lg:h-32 transition-all" width="1024"
             height="1024">
      </header>

      <!-- Menu -->
      <div class="flex-1 overflow-y-auto py-4 px-3 space-y-4">
        @for (item of menuItems(); track item.label) {
          <div class="space-y-1">
            @if (item.visible) {
              <div [routerLink]="item.items ? null : item.routerLink"
                   routerLinkActive="bg-white !text-black"
                   [routerLinkActiveOptions]="{exact: true}"
                   [class.hover:bg-gray-800]="!item.items"
                   [class.hover:text-white]="!item.items"
                   [class.cursor-pointer]="!item.items"
                   [class.cursor-default]="item.items"
                   class="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg text-sm font-semibold transition-all">
                <i [class]="item.icon + ' text-xl'" class="w-6 text-center"></i>
                <span class="hidden lg:inline">{{ item.label }}</span>
              </div>

              @if (item.items) {
                <!-- Sottomenu -->
                <div class="hidden lg:flex ml-4 pl-4 border-l border-gray-700 flex-col cursor-pointer">
                  @for (subItem of item.items; track subItem.label) {
                    <div [routerLink]="subItem.routerLink"
                         [routerLinkActiveOptions]="{exact: true}"
                         routerLinkActive="bg-white text-black! font-semibold"
                         (click)="subItem.command ? subItem.command({originalEvent: $event, item: subItem}) : null"
                         class="p-0.5 mb-1 flex flex-row hover:text-white hover:bg-gray-800 rounded-md">
                      <i [class]="subItem.icon + ' text-lg'" class="w-6 text-center content-center"></i>
                      <span class="block p-2 text-sm  transition-all">
                          {{ subItem.label }}
                      </span>
                    </div>
                  }
                </div>
              }
            }
          </div>
        }
      </div>

      <!-- Footer -->
      <footer class="p-4 border-t border-gray-800 bg-gray-900 shrink-0">
        @if (isLoggedIn()) {
          <div class="mb-4">
            <p class="hidden lg:block text-xs font-bold text-gray-500 uppercase mb-2">Utente</p>
            <button (click)="openInfo()"  class="w-full flex items-center justify-center lg:justify-start gap-3 p-2 rounded-lg text-left cursor-pointer">
              <div class="flex-1 min-w-0 hidden lg:block">
                <p class="text-sm font-medium text-white truncate">{{ fullName() }}</p>
                <p class="text-xs text-gray-500 truncate">{{ email() }}</p>
              </div>
              <i class="pi pi-user lg:hidden text-xl text-gray-400"></i>
            </button>
          </div>
          <button (click)="logOut()"
                  class="w-full flex items-center justify-center gap-2 p-3 text-sm font-semibold text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-xl cursor-pointer">
            <i class="pi pi-sign-out text-xl lg:text-sm"></i>
            <span class="hidden lg:inline">Logout</span>
          </button>
        } @else {
          <button (click)="logIn()"
                  class="w-full p-3 flex items-center justify-center gap-1.5 bg-white text-black rounded-xl hover:bg-gray-200 cursor-pointer">
            <i class="pi pi-sign-in text-xl"></i>
            <span class="hidden lg:inline text-sm font-bold">Accedi</span>
          </button>
        }
      </footer>
    </aside>
    <app-user-profile [(visible)]="isVisible" [user]="userProfile()"></app-user-profile>
  `,
  styles: ``,
  standalone: true
})
export class SidebarComponent {
  private authService: AuthService = inject(AuthService);
  private dialogService: DialogService = inject(DialogService);

  protected userProfile: WritableSignal<UserProfile | null> = this.authService.userProfile;
  protected isVisible = false;

  /**
   * Nome completo dell'utente con fallback
   */
  protected fullName: Signal<string> = computed(() => {
    return this.userProfile()?.name || '';
  });

  /**
   * Email dell'utente con fallback
   */
  protected email: Signal<string> = computed(() => {
    return this.userProfile()?.email || '';
  });

  /**
   * Stato di autenticazione dell'utente
   */
  protected isLoggedIn: Signal<boolean> = computed(() => {
    return this.authService.isAuthenticated() as boolean;
  });

  /**
   * Items del menu sidebar
   */
  protected menuItems: Signal<MenuItem[]> = computed(() => {
    const loggedIn = this.isLoggedIn();

    return [
      {
        label: 'Home',
        icon: PrimeIcons.HOME,
        visible: true,
        routerLink: '/home'
      },
      {
        label: 'Biblioteca',
        icon: PrimeIcons.BOOK,
        visible: loggedIn,
        items: [
          {
            label: 'Ricerca',
            icon: PrimeIcons.SEARCH,
            command: (event: MenuItemCommandEvent) => {
              this.openSearch();
            }
          },
          {
            label: 'Gestione',
            icon: PrimeIcons.FOLDER_PLUS,
            command: (event: MenuItemCommandEvent) => {
              this.openManagementBooks();
            }
          }
        ]
      },
      {
        label: 'Dashboard',
        icon: PrimeIcons.CHART_PIE,
        visible: loggedIn,
        items: [
          {
            label: 'Statistiche',
            icon: PrimeIcons.CHART_LINE,
            routerLink: '/user/dashboard'
          },
        ]
      },
    ];
  });

  /**
   * Apre il dialog di login
   */
  protected logIn(): void {
    this.authService.login();
  }

  /**
   * Esegue il logout dell'utente
   */
  protected logOut(): void {
    this.authService.logOut();
  }

  /**
   * Apre il dialog del profilo utente
   */
  protected openInfo(): void {
    this.isVisible = true;
  }

  /**
   * Apre il dialog di ricerca libri
   */
  protected openSearch(): void {
    this.dialogService.open(BookSearchComponent, {
      ...DEFAULT_DIALOG_CONFIG,
      header: 'Ricerca',
      data: {
        footerConfig: {
          showCloseButton: true,
          showSaveButton: false
        }
      }
    });
  }

  /**
   * Apre il dialog di gestione libri
   */
  protected openManagementBooks(): void {
    this.dialogService.open(BookManagementComponent, {
      ...DEFAULT_DIALOG_CONFIG,
      header: 'Gestione',
      data: {
        footerConfig: {
          showCloseButton: true,
          showSaveButton: false
        }
      }
    });
  }
}
