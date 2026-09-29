import { Component, inject } from '@angular/core';
import { TuiLink } from '@taiga-ui/core';
import { TuiHeader } from '@taiga-ui/layout';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [TuiHeader, TuiLink, RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.less',
  templateUrl: './header.html',
})
export class Header {
  protected router = inject(Router);
  protected authService = inject(AuthService);

  Logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
