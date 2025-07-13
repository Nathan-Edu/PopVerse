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

  criarReview(review: any): Observable<any> {
    return this.http.post(this.apiUrl, review, {
      headers: this.getAuthHeaders()
    });
  }

  buscarReviews(tipo: string, id: string): Observable<any> {
    const contentId = `${tipo}-${id}`;
    return this.http.get(`${this.apiUrl}/${contentId}`);
  }

  deletarReview(contentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${contentId}`, {
      headers: this.getAuthHeaders()
    });
  }
}