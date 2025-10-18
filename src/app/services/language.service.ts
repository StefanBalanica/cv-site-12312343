import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'en' | 'ro';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private currentLanguage = new BehaviorSubject<Language>('en');
  public currentLanguage$ = this.currentLanguage.asObservable();

  constructor() {
    const saved = localStorage.getItem('language');
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = (saved as Language) || (browserLang === 'ro' ? 'ro' : 'en');
    this.setLanguage(defaultLang);
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage.value;
  }

  setLanguage(language: Language) {
    this.currentLanguage.next(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }

  toggleLanguage() {
    const newLang = this.currentLanguage.value === 'en' ? 'ro' : 'en';
    this.setLanguage(newLang);
  }
}
