import { Injectable, inject, signal } from '@angular/core';
import { mockProducts } from '../constants/dashboard.constants';
import { Product } from '../models/product.model';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor() {
    this.products.set(this.loadFromStorage());
    this.updateStorage();
  }

  private readonly storageService = inject(StorageService);
  private readonly authService = inject(AuthService);

  private readonly storageKey = signal<string>(`${this.authService.currentUser()}-dashboardProducts`);
  readonly products = signal<Product[]>(mockProducts);

  private loadFromStorage(): Product[] {
    try {
      const raw = this.storageService.getDataFromStorage(this.storageKey());
      if (!raw) {
        return mockProducts;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : mockProducts;
    } catch {
      return mockProducts;
    }
  }

  private updateStorage() {
    this.storageService.setDataToStorage(this.storageKey(), JSON.stringify(this.products()));
  }

  editProduct(id: number, product: Product) {
    this.products.update((products) =>
      products.map((p) => (p.id === id ? product : p))
    );
    this.updateStorage();
  }

  addProduct(product: Product) {
    this.products.update((products) => [...products, product]);
    this.updateStorage();
  }

  removeProduct(id: number) {
    this.products.update((products) => products.filter((product) => product.id !== id));
    this.updateStorage();
  }
}
