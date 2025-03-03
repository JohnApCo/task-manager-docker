import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'user-theme'; // Clave en localStorage

  constructor() {
    this.applyInitialTheme();
  }

  private applyInitialTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as 'light-theme' | 'dark-theme';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark-theme' : 'light-theme');
    this.setTheme(theme);
  }

  // Aplica el tema y lo guarda
  setTheme(theme: 'light-theme' | 'dark-theme') {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  // Obtiene el tema actual
  getTheme(): 'light-theme' | 'dark-theme' {
    return document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
  }

  // Alternar entre temas
  toggleTheme() {
    const newTheme = this.getTheme() === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }
}
