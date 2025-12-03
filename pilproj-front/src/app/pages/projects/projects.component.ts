import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';

type Project = {
  id: number;
  intitule: string;
  clientId: number | null;
};

type ClientOption = {
  id: number;
  label: string;
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CardModule,
    ButtonModule,
    DividerModule,
    TableModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    TagModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  clients: ClientOption[] = [
    { id: 1, label: 'Acme Corp' },
    { id: 2, label: 'Globex' },
  ];

  projects: Project[] = [
    { id: 1, intitule: 'Refonte portail', clientId: 1 },
    { id: 2, intitule: 'Migration cloud', clientId: 2 },
  ];

  showProjectDialog = false;
  editingProjectId: number | null = null;
  nextProjectId = 3;

  projectForm: Project = { id: 0, intitule: '', clientId: null };

  clientLabel(id: number | null): string {
    const c = this.clients.find((cl) => cl.id === id);
    return c ? c.label : '-';
  }

  openProjectDialog(project?: Project) {
    if (project) {
      this.editingProjectId = project.id;
      this.projectForm = { ...project };
    } else {
      this.editingProjectId = null;
      this.projectForm = { id: 0, intitule: '', clientId: null };
    }
    this.showProjectDialog = true;
  }

  saveProject() {
    if (!this.projectForm.intitule.trim()) return;
    if (this.editingProjectId) {
      this.projects = this.projects.map((p) =>
        p.id === this.editingProjectId ? { ...this.projectForm, id: p.id } : p
      );
    } else {
      this.projects = [...this.projects, { ...this.projectForm, id: this.nextProjectId++ }];
    }
    this.showProjectDialog = false;
  }

  deleteProject(id: number) {
    this.projects = this.projects.filter((p) => p.id !== id);
  }
}
