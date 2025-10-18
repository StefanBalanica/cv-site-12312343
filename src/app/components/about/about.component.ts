import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { PersonalInfo } from '../../models/personal-info.model';
import { TranslationService } from '../../services/translation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  private dataService = inject(DataService);
  private translationService = inject(TranslationService);
  personalInfo: PersonalInfo | null = null;
  aboutTitle$!: Observable<string>;
  aboutDescription$!: Observable<string>;

  ngOnInit() {
    this.dataService.getPersonalInfo().subscribe(info => (this.personalInfo = info));
    this.aboutTitle$ = this.translationService.getTranslationAsync('about.title');
    this.aboutDescription$ = this.translationService.getTranslationAsync('about.description');
  }
}
