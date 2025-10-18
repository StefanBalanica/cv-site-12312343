import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Skill } from '../../models/skill.model';
import { TranslationService } from '../../services/translation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  private dataService = inject(DataService);
  private translationService = inject(TranslationService);
  skills: Skill[] = [];
  skillsTitle$!: Observable<string>;
  allSkillsText$!: Observable<string>;

  ngOnInit() {
    this.dataService.getSkills().subscribe({
      next: (skills) => {
        console.log('Skills loaded:', skills);
        this.skills = skills;
      },
      error: (error) => {
        console.error('Error loading skills:', error);
      }
    });

    this.skillsTitle$ = this.translationService.getTranslationAsync('skills.title');
    this.allSkillsText$ = this.translationService.getTranslationAsync('skills.all');
  }
}
