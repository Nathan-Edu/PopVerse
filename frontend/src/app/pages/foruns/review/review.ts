import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface Comentario {
  user: string;
  nota: number;
  texto: string;
  data: Date;
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review.html'
})
export class ReviewComponent {
  nota = 0;
  novoComentario = '';
  comentarios: Comentario[] = [];
  midiaId!: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.midiaId = +params['id'];
      console.log('ID da mídia recebida para avaliação:', this.midiaId);
      // Aqui você pode carregar comentários do backend com base no ID
    });
  }

  setNota(valor: number) {
    this.nota = valor;
  }

  enviarComentario() {
    if (!this.novoComentario.trim() || this.nota === 0) return;

    const comentario: Comentario = {
      user: 'Usuário Demo', // substituir pelo usuário logado
      nota: this.nota,
      texto: this.novoComentario.trim(),
      data: new Date()
    };

    this.comentarios.unshift(comentario);
    this.novoComentario = '';
    this.nota = 0;
  }
}
