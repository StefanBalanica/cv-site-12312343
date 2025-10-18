import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Project } from '../../models/project.model';
import { TranslationService } from '../../services/translation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  private dataService = inject(DataService);
  private translationService = inject(TranslationService);
  projects: Project[] = [];
  featuredProjects: Project[] = [];
  otherProjects: Project[] = [];

  // Translation observables
  projectsTitle$!: Observable<string>;
  featuredText$!: Observable<string>;
  allText$!: Observable<string>;
  demoText$!: Observable<string>;
  githubText$!: Observable<string>;

  ngOnInit() {
    this.dataService.getProjects().subscribe({
      next: (projects) => {
        console.log('Projects loaded:', projects);
        this.projects = projects;
        this.featuredProjects = projects.filter(p => p.featured);
        this.otherProjects = projects.filter(p => !p.featured);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });

    // Initialize translations
    this.projectsTitle$ = this.translationService.getTranslationAsync('projects.title');
    this.featuredText$ = this.translationService.getTranslationAsync('projects.featured');
    this.allText$ = this.translationService.getTranslationAsync('projects.all');
    this.demoText$ = this.translationService.getTranslationAsync('projects.demo');
    this.githubText$ = this.translationService.getTranslationAsync('projects.github');
  }

  getProjectTitle(projectId: string): Observable<string> {
    return this.translationService.getTranslationAsync(`projects.${projectId}.title`);
  }

  getProjectDescription(projectId: string): Observable<string> {
    return this.translationService.getTranslationAsync(`projects.${projectId}.description`);
  }
}
