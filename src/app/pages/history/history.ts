import { Component, signal, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TUI_BREAKPOINT,
  TuiCell
} from '@taiga-ui/core';
import { TuiCardLarge, TuiSurface } from '@taiga-ui/layout';
import { TuiTable } from '@taiga-ui/addon-table';
import { Purchase } from '../../models/purchase.model';
import { purchases } from '../../constants/history.constants';

@Component({
  imports: [
    FormsModule,
    TuiCardLarge,
    TuiCell,
    TuiSurface,
    TuiTable,
  ],
  selector: 'app-history',
  styleUrl: './history.less',
  templateUrl: './history.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class History {
  protected readonly purchases = signal<Purchase[]>(purchases);

  private readonly breakpoint = inject(TUI_BREAKPOINT);

  protected readonly isMobile = computed(() => this.breakpoint() === 'mobile');
  protected readonly tableSize = computed<'m' | 'l'>(() =>
    this.breakpoint() === 'desktopSmall' ? 'm' : 'l'
  );
}

