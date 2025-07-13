import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router) {}

  entrar() {
    this.authService.login({ email: this.email, password: this.senha }).subscribe({
  next: (res) => {
    this.authService.saveToken(res.token, res.user);
    this.router.navigate(['/dashboard']);
  },
  error: (err) => {
    console.error(err);
    alert('Erro ao fazer login.');
  }
});
  }
}
