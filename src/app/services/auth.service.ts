import { Injectable, inject, signal } from '@angular/core';
import { mockUser } from '../constants/auth.constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService { 

  private readonly storageService = inject(StorageService);

  private readonly storageKey = 'isAuthenticated';
  private readonly currentUserKey = 'username';
  readonly isAuthenticated = signal<boolean>(this.getAuthState());
  readonly currentUser = signal<string>(this.getCurrentUser());

  login(username: string, password: string): boolean {
    if (username === mockUser.username && password === mockUser.password) {
      this.storageService.setDataToStorage(this.storageKey, 'true');
      this.isAuthenticated.set(true);
      this.storageService.setDataToStorage(this.currentUserKey, username);
      this.currentUser.set(username);
      return true;
    }

    return false;
  }

  logout(): void {
    this.storageService.removeDataFromStorage(this.storageKey);
    this.isAuthenticated.set(false);
    this.storageService.removeDataFromStorage(this.currentUserKey);
    this.currentUser.set('');
  }

  getAuthState(): boolean {
    return this.storageService.getDataFromStorage(this.storageKey) === 'true';
  }

  getCurrentUser(): string {
    return this.storageService.getDataFromStorage(this.currentUserKey) ?? '';
  }
}