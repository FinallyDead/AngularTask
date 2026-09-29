import { Injectable, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly document = inject(DOCUMENT);

  setDataToStorage(key: string, value: string): void {
    this.document.defaultView?.localStorage?.setItem(key, value);
  }

  removeDataFromStorage(key: string): void {
    this.document.defaultView?.localStorage?.removeItem(key);
  }

  getDataFromStorage(key: string): string | null | undefined {
    return this.document.defaultView?.localStorage?.getItem(key);
  }
}
