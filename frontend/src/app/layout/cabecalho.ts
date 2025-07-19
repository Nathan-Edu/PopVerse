import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service'

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cabecalho.html'
})
export class CabecalhoComponent {

    temaAtual: 'light' | 'dark' = 'light';

  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService) {}

  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  getUserName(): string {
    return this.authService.getUser()?.name || '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  this.temaAtual = this.themeService.getCurrentTheme();
  }

  alternarTema() {
  this.themeService.toggleTheme();
  this.temaAtual = this.themeService.getCurrentTheme();
  }

}
