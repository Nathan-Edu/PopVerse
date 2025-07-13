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
  private apiUrl = 'http://localhost:5000/api/comics';

  constructor(private http: HttpClient) {}

  buscarHqs(): Observable<HQ[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.results.map((item: any) => ({
        id: item.id,
        title: item.name || 'Sem título',
        year: item.cover_date ? new Date(item.cover_date).getFullYear() : 0,
        genre: item.volume?.name || 'Desconhecido',
        rating: 4.5,
        image: item.image?.original_url || '/assets/hq-placeholder.svg',
        description: item.description?.replace(/<[^>]+>/g, '') || 'Sem descrição disponível.',
        userRating: 0
      })))
    );
  }
}


