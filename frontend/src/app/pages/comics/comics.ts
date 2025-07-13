import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { HqService, HQ } from '../../../services/hq.service';

@Component({
  selector: 'app-hqs',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './comics.html',
  styleUrls: ['./comics.css']
})
export class ComicsComponent implements OnInit {
  searchTerm = '';
  hqs: HQ[] = [];

  constructor(private hqService: HqService, private router: Router) {}

  ngOnInit(): void {
    this.hqService.buscarHqs().subscribe({
      next: (hqs) => {
        console.log('HQs recebidas:', hqs);
        this.hqs = hqs;
      },
      error: (err) => {
        console.error('Erro ao buscar HQs:', err);
      }
    });
  }

  abrirForum(id: number, titulo: string, tipo: string = 'hq', imagem: string): void {
  this.router.navigate(
    ['/foruns', 'review', tipo, id],
    { queryParams: { titulo, img: imagem } }
  );
}

  filteredHqs(): HQ[] {
    if (!this.hqs || this.hqs.length === 0) return [];
    if (!this.searchTerm.trim()) return this.hqs;

    const termo = this.searchTerm.toLowerCase();
    return this.hqs.filter(hq => hq.title.toLowerCase().includes(termo));
  }
}
