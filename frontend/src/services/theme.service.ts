import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storageKey = 'tema';
  private root = document.documentElement;

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'dark') {
      this.root.classList.add('dark');
    } else {
      this.root.classList.remove('dark');
    }
  }

  getCurrentTheme(): 'light' | 'dark' {
    return this.root.classList.contains('dark') ? 'dark' : 'light';
  }

  toggleTheme() {
    const isDark = this.root.classList.contains('dark');
    this.root.classList.toggle('dark');
    localStorage.setItem(this.storageKey, isDark ? 'light' : 'dark');
  }
}
