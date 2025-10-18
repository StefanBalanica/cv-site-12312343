import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this.isDarkMode.asObservable();

  constructor() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = saved === 'dark' || (!saved && prefersDark);
    this.setTheme(shouldUseDark);
  }

  toggleTheme() { this.setTheme(!this.isDarkMode.value); }

  setTheme(isDark: boolean) {
    this.isDarkMode.next(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }
}
