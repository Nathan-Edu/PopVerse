import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SerieService, Serie } from '../../../services/serie.service';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './series.html',
  styleUrls: ['./series.css']
})
export class SeriesComponent implements OnInit {
  searchTerm = '';
  series: Serie[] = [];

  constructor(private serieService: SerieService, private router: Router) {}

  ngOnInit(): void {
    this.serieService.buscarSeries().subscribe((series) => {
      this.series = series;
    });
  }

  abrirForum(id: number) {
    this.router.navigate(['/foruns', id]);
  }

  filteredSeries(): Serie[] {
    if (!this.series || this.series.length === 0) return [];
    if (!this.searchTerm || this.searchTerm.trim() === '') return this.series;
    return this.series.filter((serie) =>
      serie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
