import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router) {}

 entrar() {
  this.authService.login({ email: this.email, senha: this.senha }).subscribe({
    next: (res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/dshboard']);
    },
    error: (err: any) => {
      alert('Login inválido');
      console.error(err);
    }
  });
}
}
