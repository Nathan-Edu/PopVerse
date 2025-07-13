import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  contentId: string;  
  rating: number;
  comment: string;
  createdAt?: string;
  user?: {
    _id?: string;
    name: string;
    profileImage?: string;
  };
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = 'http://localhost:5000/reviews';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Criar ou atualizar avaliação.
   */
  criarReview(review: Review): Observable<any> {
    return this.http.post(`${this.apiUrl}`, review, {
      headers: this.getAuthHeaders()
    });
  }

  /**
   * Buscar avaliações por tipo e id (ex: filme-123).
   */
  buscarReviews(tipo: string, id: string): Observable<any> {
    const contentId = `${tipo}-${id}`;
    return this.http.get(`${this.apiUrl}/${contentId}`);
  }

  /**
   * Deletar avaliação do usuário autenticado.
   */
  deletarReview(contentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${contentId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
