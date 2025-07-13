import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilmeService, Filme } from '../../../services/filme.service';

@Component({
  selector: 'app-filmes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filmes.html',
  styleUrls: ['./filmes.css']
})
export class FilmesComponent implements OnInit {
  searchTerm = '';
  filmes: Filme[] = [];

  constructor(private filmeService: FilmeService, private router: Router) {}

  ngOnInit() {
    this.filmeService.buscarFilmes().subscribe((filmes: Filme[]) => {
      console.log('Filmes da API:', filmes);
      this.filmes = filmes;
    });
  }

  abrirForum(id: number, titulo: string, tipo: string, imagem: string) {
  this.router.navigate(
    ['/foruns', 'review', tipo, id],
    { queryParams: { titulo, img: imagem } }
  );
}

  filteredMovies(): Filme[] {
    if (!this.filmes || this.filmes.length === 0) return [];

    if (!this.searchTerm || this.searchTerm.trim() === '') {
      return this.filmes;
    }

    return this.filmes.filter((movie) =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}