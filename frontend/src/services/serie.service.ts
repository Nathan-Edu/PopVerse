import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Serie {
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
export class SerieService {
  private apiKey = '4ef29d19ed40a43a307e1f7f57afbcb4';
  private apiUrl = 'https://api.themoviedb.org/3/tv/popular';
  private imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private http: HttpClient) {}

  buscarSeries(): Observable<Serie[]> {
    const url = `${this.apiUrl}?api_key=${this.apiKey}&language=pt-BR&page=1`;
    return this.http.get<any>(url).pipe(
      map(response => response.results.map((serie: any) => ({
        id: serie.id,
        title: serie.name,
        year: new Date(serie.first_air_date).getFullYear(),
        genre: 'Desconhecido',
        rating: parseFloat(serie.vote_average.toFixed(1)),
        image: this.imageBaseUrl + serie.poster_path,
        description: serie.overview,
        userRating: 0
      })))
    );
  }
}
