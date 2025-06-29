import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  nome = '';
  email = '';
  senha = '';

  registrar() {
    console.log('Registrando usuário (apenas teste):', {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    });
    alert('Esse é um exemplo de envio. Integre com o backend se quiser persistência.');
  }

}
