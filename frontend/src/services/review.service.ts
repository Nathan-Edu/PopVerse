import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  contentId: string;  
  rating: number;
  comment: string;
  createdAt?: string;
  user?: {
    name: string;
  };
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = 'http://localhost:5000/reviews';

  constructor(private http: HttpClient) {}

  //  Enviar nova avaliação com token
  criarReview(review: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.post(`${this.apiUrl}`, review, { headers });
}

  //  Buscar avaliações com ID composto tipo-filmeId
  buscarReviews(tipo: string, id: string): Observable<any> {
    const contentId = `${tipo}-${id}`;
    return this.http.get<any>(`${this.apiUrl}/${contentId}`);
  }
}
