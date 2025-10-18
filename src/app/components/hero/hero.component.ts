import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { PersonalInfo } from '../../models/personal-info.model';
import { TranslationService } from '../../services/translation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  private dataService = inject(DataService);
  private translationService = inject(TranslationService);
  personalInfo: PersonalInfo | null = null;

  // Translation observables
  downloadCVText$!: Observable<string>;
  contactMeText$!: Observable<string>;
  aboutDescription$!: Observable<string>;

  ngOnInit() {
    this.dataService.getPersonalInfo().subscribe({
      next: (info) => {
        console.log('Personal info loaded:', info);
        this.personalInfo = info;
      },
      error: (error) => {
        console.error('Error loading personal info:', error);
      }
    });

    // Initialize translations
    this.downloadCVText$ = this.translationService.getTranslationAsync('hero.downloadCV');
    this.contactMeText$ = this.translationService.getTranslationAsync('hero.contactMe');
    this.aboutDescription$ = this.translationService.getTranslationAsync('about.description');
  }

  downloadCV() {
    if (!this.personalInfo?.cvUrl) {
      console.error('CV URL not found');
      return;
    }
    
    try {
      const link = document.createElement('a');
      link.href = this.personalInfo.cvUrl;
      link.download = this.personalInfo.cvUrl.split('/').pop() || 'cv-stefan-balanica.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Add to DOM, click, then remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('CV download initiated:', this.personalInfo.cvUrl);
    } catch (error) {
      console.error('Error downloading CV:', error);
      // Fallback: open in new tab
      window.open(this.personalInfo.cvUrl, '_blank');
    }
  }
}
