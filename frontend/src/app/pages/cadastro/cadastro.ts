import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.html'
})
export class CadastroComponent {
  nome = '';
  username = '';
  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router) {}

  cadastrar() {
    const payload = {
      name: this.nome,
      username: this.username,
      email: this.email,
      password: this.senha,
      interests: [] 
    };

    this.authService.register(payload).subscribe({
      next: (res: any) => {
        alert('Usuário cadastrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Erro no cadastro:', err);
        alert('Erro ao cadastrar. Verifique os campos ou tente outro e-mail.');
      }
    });
  }
}
