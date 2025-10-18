import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LanguageService, Language } from './language.service';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translations = new BehaviorSubject<any>({});
  public translations$ = this.translations.asObservable();

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
    // Load initial translations
    this.loadTranslations(this.languageService.getCurrentLanguage());
    
    // Listen for language changes
    this.languageService.currentLanguage$.subscribe(lang => {
      this.loadTranslations(lang);
    });
  }

  private loadTranslations(language: Language) {
    this.http.get(`/i18n/${language}.json`)
      .pipe(
        catchError(() => {
          console.warn(`Failed to load translations for ${language}, falling back to English`);
          return this.http.get('/i18n/en.json');
        })
      )
      .subscribe(translations => {
        this.translations.next(translations);
      });
  }

  getTranslation(key: string): string {
    const translations = this.translations.value;
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return key; // Return key if translation not found
      }
    }
    
    return value || key;
  }

  getTranslationAsync(key: string): Observable<string> {
    return this.translations$.pipe(
      map(translations => {
        const keys = key.split('.');
        let value = translations;
        
        for (const k of keys) {
          value = value?.[k];
          if (value === undefined) {
            return key;
          }
        }
        
        return value || key;
      })
    );
  }
}
