import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { PersonalInfo } from '../../models/personal-info.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  private dataService = inject(DataService);
  personalInfo: PersonalInfo | null = null;
  currentYear = new Date().getFullYear();

  ngOnInit() {
    this.dataService.getPersonalInfo().subscribe(info => (this.personalInfo = info));
  }

  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
