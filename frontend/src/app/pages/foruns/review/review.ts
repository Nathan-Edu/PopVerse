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
  nota = 0;
  novoComentario = '';
  comentarios: any[] = [];
  mediaAvaliacao: number | null = null;

  tipo = '';
  midiaId = '';
  titulo = '';
  imagem = '';

  usuarioLogado: any = null;
  jaAvaliou = false;
  idDaMinhaReview: string | null = null;
  editando = false;
  
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.usuarioLogado = this.getUser();

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

    const review = {
      contentId: `${this.tipo}-${this.midiaId}`,
      rating: this.nota,
      comment: this.novoComentario
    };

    this.reviewService.criarReview(review).subscribe({
      next: () => {
        this.novoComentario = '';
        this.nota = 0;
        this.editando = false;
        this.carregarComentarios();
        alert(this.jaAvaliou ? 'Avaliação atualizada com sucesso!' : 'Avaliação enviada com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao enviar avaliação:', err);
        alert('Erro ao enviar avaliação.');
      }
    });
  }

  carregarComentarios() {
    const contentId = `${this.tipo}-${this.midiaId}`;
    this.reviewService.buscarReviews(this.tipo, this.midiaId).subscribe({
      next: (res) => {
        this.comentarios = res.reviews || [];
        this.mediaAvaliacao = res.average || null;

        const meuId = this.usuarioLogado?._id;
        const minhaReview = this.comentarios.find(r => r.user?._id === meuId);

        if (minhaReview) {
          this.jaAvaliou = true;
          this.idDaMinhaReview = minhaReview._id;
          this.nota = minhaReview.rating;
          this.novoComentario = minhaReview.comment;
        } else {
          this.jaAvaliou = false;
          this.idDaMinhaReview = null;
        }
      },
      error: (err) => {
        console.error('Erro ao carregar avaliações:', err);
      }
    });
  }

  editarMinhaReview() {
    const minhaReview = this.comentarios.find(r => r.user?._id === this.usuarioLogado?._id);
    if (minhaReview) {
      this.editando = true;
      this.nota = minhaReview.rating;
      this.novoComentario = minhaReview.comment;
    }
  }

  cancelarEdicao() {
    this.editando = false;
    this.nota = 0;
    this.novoComentario = '';
  }

  deletarReview() {
    if (!this.idDaMinhaReview) return;

    const confirmacao = confirm('Deseja mesmo excluir sua avaliação?');
    if (!confirmacao) return;

    const contentId = `${this.tipo}-${this.midiaId}`;
    this.reviewService.deletarReview(contentId).subscribe({
      next: () => {
        this.carregarComentarios();
        this.nota = 0;
        this.novoComentario = '';
        this.editando = false;
        alert('Avaliação deletada com sucesso!');
      },
      error: () => {
        alert('Erro ao excluir sua avaliação.');
      }
    });
  }
}
