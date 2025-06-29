import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AnimeService, Anime } from '../../../services/anime.service';

@Component({
  selector: 'app-animes',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './animes.html',
  styleUrls: ['./animes.css']
})
export class AnimesComponent implements OnInit {
  searchTerm = '';
  animes: Anime[] = [];

  constructor(private animeService: AnimeService, private router: Router) {}

  ngOnInit(): void {
    this.animeService.buscarAnimes().subscribe((animes) => {
      this.animes = animes;
    });
  }

  abrirForum(id: number) {
    this.router.navigate(['/foruns', id]);
  }

  filteredAnimes(): Anime[] {
    if (!this.animes || this.animes.length === 0) return [];
    if (!this.searchTerm || this.searchTerm.trim() === '') return this.animes;
    return this.animes.filter((anime) =>
      anime.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
