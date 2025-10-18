import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../models/personal-info.model';
import { Skill } from '../models/skill.model';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  getPersonalInfo(): Observable<PersonalInfo> {
    return this.http.get<PersonalInfo>('/data/personal-info.json');
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>('/data/skills.json');
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/data/projects.json');
  }
}


