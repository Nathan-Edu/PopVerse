import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient) {}

  login(data: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: {
    name: string;
    username: string;
    email: string;
    password: string;
    interests?: string[];
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
    
  }
  
}
console.log('✅ AuthService carregado');

