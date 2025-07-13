import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { GameService, Game } from '../../../services/game.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './games.html',
  styleUrls: ['./games.css']
})
export class GamesComponent implements OnInit {
  searchTerm = '';
  games: Game[] = [];

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.gameService.buscarGames().subscribe((games) => {
      this.games = games;
    });
  }

abrirForum(id: number | string, titulo: string, tipo: string, imagem: string) {
  this.router.navigate(['/foruns/review', tipo, id], {
    queryParams: { titulo, img: imagem }
  });
}


  filteredGames(): Game[] {
    if (!this.games || this.games.length === 0) return [];
    if (!this.searchTerm || this.searchTerm.trim() === '') return this.games;
    return this.games.filter((game) =>
      game.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
