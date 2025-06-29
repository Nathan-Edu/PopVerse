import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  contentId: number;
  rating: number;
  comment: string;
  createdAt?: string;
  user?: {
    name: string;
  };
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = 'http://localhost:5000/api/reviews';

  constructor(private http: HttpClient) {}

  enviarReview(review: Review): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, review, { headers });
  }

  listarReviews(tipo: string, itemId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/${tipo}/${itemId}`);
  }
}
