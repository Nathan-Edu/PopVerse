import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  templateUrl: './cabecalho.html',
  styleUrls: ['./cabecalho.css'],
  imports: [CommonModule, RouterModule]
})
export class CabecalhoComponent {}
