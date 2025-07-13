import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Anime {
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
export class AnimeService {
  private apiUrl = 'http://localhost:5000/anime/top'; 

  constructor(private http: HttpClient) {}

  buscarAnimes(): Observable<Anime[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data.map((anime: any) => ({
        id: anime.mal_id,
        title: anime.title,
        year: new Date(anime.aired.from).getFullYear(),
        genre: anime.type || 'Desconhecido',
        rating: parseFloat((anime.score || 0).toFixed(1)),
        image: anime.images.webp.image_url,
        description: anime.synopsis,
        userRating: 0
      })))
    );
  }
}

