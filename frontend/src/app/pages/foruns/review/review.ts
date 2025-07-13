import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../../../services/review.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review.html'
})
export class ReviewComponent {
  nota: number = 0;
  novoComentario: string = '';
  comentarios: any[] = [];

  tipo: string = '';
  midiaId: string = '';
  titulo: string = '';
  imagem: string = '';

  usuarioLogado: any = null;
  jaAvaliou: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
      console.log('Rota ativada!');
      this.route.params.subscribe(params => {
      this.midiaId = params['id'];
      this.tipo = params['tipo'];
      if (this.tipo && this.midiaId) {
        this.carregarComentarios();
      }
    });

    this.route.queryParams.subscribe(query => {
      this.titulo = query['titulo'];
      this.imagem = query['img'];
    });

    // Verifica o usuário atual
    this.usuarioLogado = this.getUser();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  setNota(valor: number) {
    this.nota = valor;
  }

  enviarComentario() {
    if (this.nota < 1 || this.nota > 5) {
      alert('Por favor, selecione uma nota entre 1 e 5 estrelas.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para avaliar.');
      return;
    }

    const review = {
      contentId: `${this.tipo}-${this.midiaId}`,
      rating: this.nota,
      comment: this.novoComentario
    };

    this.reviewService.criarReview(review).subscribe({
      next: () => {
        this.novoComentario = '';
        this.nota = 0;
        this.carregarComentarios();
        alert('Avaliação enviada com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao enviar avaliação:', err);
        alert('Você já avaliou esta mídia ou ocorreu um erro.');
      }
    });
  }

  carregarComentarios() {
    this.reviewService.buscarReviews(this.tipo, this.midiaId).subscribe({
      next: (res) => {
        this.comentarios = res.reviews || [];
        const meuId = this.usuarioLogado?._id;
        this.jaAvaliou = this.comentarios.some(r => r.user?._id === meuId);
      },
      error: () => {
        this.comentarios = [];
      }
    });
  }
}
