import { Routes } from '@angular/router';
//import { HomeComponent } from './pages/home';
import { LoginComponent } from './pages/login/login';
import { CadastroComponent } from './pages/cadastro/cadastro';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { FilmesComponent } from './pages/filmes/filmes';
import { SeriesComponent } from './pages/series/series';
import { AnimesComponent } from './pages/animes/animes';
import { GamesComponent } from './pages/games/games';
import { ComicsComponent } from './pages/comics/comics';
import { ForunsComponent } from './pages/foruns/geral/foruns';
import { ReviewComponent } from './pages/foruns/review/review';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'filmes', component: FilmesComponent },
  { path: 'series', component: SeriesComponent },
  { path: 'animes', component: AnimesComponent },
  { path: 'games', component: GamesComponent },
  { path: 'comics', component: ComicsComponent },
  { path: 'foruns', component: ForunsComponent },
  { path: 'foruns/review/:tipo/:id', component: ReviewComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

