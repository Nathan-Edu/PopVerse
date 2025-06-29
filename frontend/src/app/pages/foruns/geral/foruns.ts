import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foruns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foruns.html',
  styleUrls: ['./foruns.css']
})
export class ForunsComponent {
  categorias = [
    {
      id: 'movies',
      nome: 'Filmes',
      icone: '🎬',
      cor: 'from-red-500 to-pink-500',
      descricao: 'Discussões sobre filmes, lançamentos e críticas',
      topicos: 1234,
      posts: 5678
    },
    {
      id: 'series',
      nome: 'Séries',
      icone: '📺',
      cor: 'from-blue-500 to-purple-500',
      descricao: 'Episódios, temporadas e análises de séries',
      topicos: 987,
      posts: 4321
    },
    {
      id: 'anime',
      nome: 'Animes',
      icone: '🎌',
      cor: 'from-pink-500 to-red-500',
      descricao: 'Mangás, animes e cultura japonesa',
      topicos: 1567,
      posts: 7890
    },
    {
      id: 'games',
      nome: 'Games',
      icone: '🎮',
      cor: 'from-green-500 to-blue-500',
      descricao: 'Reviews, dicas e discussões sobre jogos',
      topicos: 2345,
      posts: 9876
    },
    {
      id: 'comics',
      nome: 'HQs',
      icone: '📚',
      cor: 'from-yellow-500 to-orange-500',
      descricao: 'Quadrinhos, graphic novels e webcomics',
      topicos: 654,
      posts: 2109
    },
    {
      id: 'geral',
      nome: 'Geral',
      icone: '💬',
      cor: 'from-purple-500 to-pink-500',
      descricao: 'Conversas gerais sobre cultura pop',
      topicos: 876,
      posts: 3456
    }
  ];
}
