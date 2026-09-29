
import { Component, signal, inject, Injector, effect, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TUI_BREAKPOINT,
  TuiButton,
  TuiCell,
  TuiDialogService
} from '@taiga-ui/core';
import {
  TUI_CONFIRM
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiSurface } from '@taiga-ui/layout';
import { TuiTable } from '@taiga-ui/addon-table';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { Add } from '../../components/modals/add/add';
import { Edit } from '../../components/modals/edit/edit';
import { Product, ProductFormPayload } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  imports: [
    FormsModule,
    TuiButton,
    TuiCardLarge,
    TuiCell,
    TuiSurface,
    TuiTable,
  ],
  selector: 'app-dashboard',
  styleUrl: './dashboard.less',
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Dashboard {

  constructor() {
    effect(() => {
      this.products.set(this.productService.products());
    })
  }

  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(Injector);
  private readonly productService = inject(ProductService);
  private readonly breakpoint = inject(TUI_BREAKPOINT);

  protected products = signal<Product[]>([]);

  protected readonly isMobile = computed(() => this.breakpoint() === 'mobile');
  protected readonly tableSize = computed<'m' | 'l'>(() =>
    this.breakpoint() === 'desktopSmall' ? 'm' : 'l'
  );

  openAddModal() {
    this.dialogs
      .open<ProductFormPayload>(new PolymorpheusComponent(Add, this.injector), {
        label: 'Add new product',
        size: 'm',
      })
      .subscribe((data) => {
        if (data) {
          const productBody: Product = {
            id: Date.now(),
            name: data.productName,
            price: data.productPrice,
            vat: data.productVat
          }
          this.productService.addProduct(productBody);
        }
      });
  }

  openEditModal(id: number) {
    const idOfProductToEdit = id;

    this.dialogs
      .open<ProductFormPayload>(new PolymorpheusComponent(Edit, this.injector), {
        label: 'Edit product',
        size: 'm',
        data: this.productService.products().find((product) => product.id === idOfProductToEdit),
      })
      .subscribe((data) => {
        if (data) {
          const productEditedBody: Product = {
            id: idOfProductToEdit,
            name: data.productName,
            price: data.productPrice,
            vat: data.productVat
          }
          this.productService.editProduct(idOfProductToEdit, productEditedBody);
        }
      });
  }

  openRemoveModal(id: number) {
    const idOfProductToRemove = id;

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Confirm deletion',
        size: 's',
        data: {
          content: 'Are you sure you want to delete this item?',
          yes: 'Delete',
          no: 'Cancel',
        },
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.productService.removeProduct(idOfProductToRemove);
        }
      });
  }
}

