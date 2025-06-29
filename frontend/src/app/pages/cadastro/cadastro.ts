import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; // ajuste o caminho se necessário

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router) {}

cadastrar() {
  const novoUsuario = {
  name: this.nome,
  email: this.email,
  username: this.email.split('@')[0], // ou outro campo
  password: this.senha,
  interests: [] // ou undefined
};

  this.authService.register(novoUsuario).subscribe({
    next: () => {
      alert('Usuário cadastrado com sucesso!');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('Erro ao cadastrar:', err);
      alert('Erro ao cadastrar. Verifique os dados.');
    }
  });
}
}
