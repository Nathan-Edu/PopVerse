import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Filme {
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
export class FilmeService {
  private apiKey = '4ef29d19ed40a43a307e1f7f57afbcb4';
  private apiUrl = 'https://api.themoviedb.org/3/movie/popular';
  private imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private http: HttpClient) {}

  buscarFilmes(): Observable<Filme[]> {
    const url = `${this.apiUrl}?api_key=${this.apiKey}&language=pt-BR&page=1`;
    return this.http.get<any>(url).pipe(
      map(response => response.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        year: new Date(movie.release_date).getFullYear(),
        genre: 'Desconhecido', 
        rating: parseFloat(movie.vote_average.toFixed(1)),
        image: this.imageBaseUrl + movie.poster_path,
        description: movie.overview,
        userRating: 0
      })))
    );
  }
}
