import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { BASE_COLLABORATEURS, BASE_PROFILS, Collaborateur, Profil } from '../../shared/mock-collaborateurs';

@Component({
  selector: 'app-collaborateurs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    DividerModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    TagModule,
  ],
  templateUrl: './collaborateurs.component.html',
  styleUrl: './collaborateurs.component.scss',
})
export class CollaborateursComponent {
  profils: Profil[] = [...BASE_PROFILS];

  collaborateurs: Collaborateur[] = [...BASE_COLLABORATEURS];

  showProfilDialog = false;
  showCollabDialog = false;

  profilForm: Profil = { id: 0, intitule: '', tjm: 0 };
  editingProfilId: number | null = null;

  collabForm: Collaborateur = { id: 0, nom: '', prenom: '', cout: 0, profilId: null };
  editingCollabId: number | null = null;

  nextProfilId = 4;
  nextCollabId = 4;

  get profilOptions() {
    return this.profils.map((p) => ({ label: p.intitule, value: p.id }));
  }

  profilLabel(id: number | null): string {
    const profil = this.profils.find((p) => p.id === id);
    return profil ? profil.intitule : '-';
  }

  openProfilDialog(profil?: Profil) {
    if (profil) {
      this.editingProfilId = profil.id;
      this.profilForm = { ...profil };
    } else {
      this.editingProfilId = null;
      this.profilForm = { id: 0, intitule: '', tjm: 0 };
    }
    this.showProfilDialog = true;
  }

  saveProfil() {
    if (!this.profilForm.intitule.trim()) {
      return;
    }
    if (this.editingProfilId) {
      this.profils = this.profils.map((p) => (p.id === this.editingProfilId ? { ...this.profilForm, id: p.id } : p));
    } else {
      this.profils = [...this.profils, { ...this.profilForm, id: this.nextProfilId++ }];
    }
    this.showProfilDialog = false;
  }

  deleteProfil(id: number) {
    this.profils = this.profils.filter((p) => p.id !== id);
    this.collaborateurs = this.collaborateurs.map((c) => (c.profilId === id ? { ...c, profilId: null } : c));
  }

  openCollabDialog(collab?: Collaborateur) {
    if (collab) {
      this.editingCollabId = collab.id;
      this.collabForm = { ...collab };
    } else {
      this.editingCollabId = null;
      this.collabForm = { id: 0, nom: '', prenom: '', cout: 0, profilId: null };
    }
    this.showCollabDialog = true;
  }

  saveCollab() {
    if (!this.collabForm.nom.trim() || !this.collabForm.prenom.trim()) {
      return;
    }
    if (this.editingCollabId) {
      this.collaborateurs = this.collaborateurs.map((c) =>
        c.id === this.editingCollabId ? { ...this.collabForm, id: c.id } : c
      );
    } else {
      this.collaborateurs = [...this.collaborateurs, { ...this.collabForm, id: this.nextCollabId++ }];
    }
    this.showCollabDialog = false;
  }

  deleteCollab(id: number) {
    this.collaborateurs = this.collaborateurs.filter((c) => c.id !== id);
  }
}
