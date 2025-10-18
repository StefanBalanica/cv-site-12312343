import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent, LanguageToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private translationService = inject(TranslationService);
  private themeService = inject(ThemeService);
  isScrolled = false;
  isMobileMenuOpen = false;

  // Translation observables
  homeText$!: Observable<string>;
  skillsText$!: Observable<string>;
  projectsText$!: Observable<string>;
  contactText$!: Observable<string>;

  // Theme observable
  isDarkMode$ = this.themeService.isDarkMode$;

  ngOnInit() {
    this.homeText$ = this.translationService.getTranslationAsync('navigation.home');
    this.skillsText$ = this.translationService.getTranslationAsync('navigation.skills');
    this.projectsText$ = this.translationService.getTranslationAsync('navigation.projects');
    this.contactText$ = this.translationService.getTranslationAsync('navigation.contact');
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.isMobileMenuOpen = false;
  }
}
