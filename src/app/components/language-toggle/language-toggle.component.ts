import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-toggle.component.html',
  styleUrl: './language-toggle.component.scss'
})
export class LanguageToggleComponent implements OnInit {
  private languageService = inject(LanguageService);
  currentLanguage: Language = 'en';

  ngOnInit() {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }
}
