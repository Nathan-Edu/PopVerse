import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Game {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  image: string;
  description: string;
  userRating: number;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private apiKey = 'aa1d2188ff7c4e0a843cd78846ebb901';
  private apiUrl = 'https://api.rawg.io/api/games';

  constructor(private http: HttpClient) {}

  buscarGames(): Observable<Game[]> {
    const url = `${this.apiUrl}?key=${this.apiKey}&ordering=-rating&page=1&page_size=20`;
    return this.http.get<any>(url).pipe(
      map(response => response.results.map((game: any) => ({
        id: game.id,
        title: game.name,
        year: game.released ? new Date(game.released).getFullYear() : 0,
        genre: game.genres && game.genres.length > 0 ? game.genres[0].name : 'Desconhecido',
        rating: game.rating,
        image: game.background_image,
        description: 'Jogo popular disponível na RAWG API.',
        userRating: 0
      })))
    );
  }
}
