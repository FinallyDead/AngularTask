import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { History } from './pages/history/history';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { userGuard } from './guards/user-guard-guard';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [userGuard] },
  { path: '', component: Home, canActivate: [authGuard] },
  { path: 'history', component: History, canActivate: [authGuard], },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard], }
];

