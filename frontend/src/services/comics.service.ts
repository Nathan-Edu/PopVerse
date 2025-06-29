import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface HQ {
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
export class HqService {
  private apiKey = '8a38356a993e814c9fe0df8e38ec39a77d080327';
  private apiUrl = 'https://comicvine.gamespot.com/api/issues/?format=json';
  private headers = new HttpHeaders({
    'User-Agent': 'PopVerse/1.0'
  });

  constructor(private http: HttpClient) {}

  buscarHqs(): Observable<HQ[]> {
    const url = `${this.apiUrl}&api_key=${this.apiKey}`;

    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map(response => response.results.map((item: any) => ({
        id: item.id,
        title: item.name || 'Sem título',
        year: item.cover_date ? new Date(item.cover_date).getFullYear() : 0,
        genre: item.volume?.name || 'Desconhecido',
        rating: 4.5, // ComicVine não fornece nota
        image: item.image?.original_url || '/assets/hq-placeholder.svg',
        description: item.description?.replace(/<[^>]+>/g, '') || 'Sem descrição disponível.',
        userRating: 0
      })))
    );
  }
}
