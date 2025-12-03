import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { BASE_COLLABORATEURS, Collaborateur } from '../../shared/mock-collaborateurs';

type ClientOption = { id: number; label: string };
type Project = { id: number; intitule: string; clientId: number | null };
type Perimetre = { id: number; nom: string; chargeInitiale: number };
type Affectation = { id: number; collaborateurId: number | null; perimetreId: number | null; jours: number };

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CardModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    TagModule,
    DividerModule,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent {
  clients: ClientOption[] = [
    { id: 1, label: 'Acme Corp' },
    { id: 2, label: 'Globex' },
  ];

  project: Project = { id: 1, intitule: 'Projet', clientId: 1 };

  perimetres: Perimetre[] = [
    { id: 1, nom: 'Pilotage', chargeInitiale: 50 },
    { id: 2, nom: 'Developpement', chargeInitiale: 300 },
    { id: 3, nom: 'DevOps', chargeInitiale: 40 },
  ];

  affectations: Affectation[] = [
    { id: 1, collaborateurId: 1, perimetreId: 1, jours: 25 },
    { id: 2, collaborateurId: 2, perimetreId: 2, jours: 120 },
  ];

  collaborateursDispo: Collaborateur[] = [...BASE_COLLABORATEURS];

  showPerimetreDialog = false;
  showAffectationDialog = false;
  showCollabDialog = false;

  perimetreForm: Perimetre = { id: 0, nom: '', chargeInitiale: 0 };
  editingPerimetreId: number | null = null;

  affectationForm: Affectation = { id: 0, collaborateurId: null, perimetreId: null, jours: 0 };
  editingAffectationId: number | null = null;

  collabForm: Collaborateur = { id: 0, nom: '', prenom: '', cout: 0, profilId: null };

  nextPerimetreId = 4;
  nextAffectationId = 3;
  nextCollabId = this.collaborateursDispo.length + 1;

  constructor(private route: ActivatedRoute) {
    const idParam = Number(this.route.snapshot.paramMap.get('id') ?? 1);
    this.project = {
      id: idParam,
      intitule: idParam === 1 ? 'Refonte portail' : 'Projet #' + idParam,
      clientId: idParam === 2 ? 2 : 1,
    };
  }

  clientLabel(id: number | null): string {
    const c = this.clients.find((cl) => cl.id === id);
    return c ? c.label : '-';
  }

  perimetreChargeAffectee(perimetreId: number): number {
    return this.affectations
      .filter((a) => a.perimetreId === perimetreId)
      .reduce((acc, a) => acc + a.jours, 0);
  }

  perimetreLabel(id: number | null): string {
    const per = this.perimetres.find((p) => p.id === id);
    return per ? per.nom : '-';
  }

  collaborateurLabel(id: number | null): string {
    const c = this.collaborateursDispo.find((col) => col.id === id);
    return c ? `${c.prenom} ${c.nom}` : '-';
  }

  get affectationDialogTitle(): string {
    return this.editingAffectationId ? "Modifier l'affectation" : 'Nouvelle affectation';
  }

  openPerimetreDialog(perimetre?: Perimetre) {
    if (perimetre) {
      this.editingPerimetreId = perimetre.id;
      this.perimetreForm = { ...perimetre };
    } else {
      this.editingPerimetreId = null;
      this.perimetreForm = { id: 0, nom: '', chargeInitiale: 0 };
    }
    this.showPerimetreDialog = true;
  }

  savePerimetre() {
    if (!this.perimetreForm.nom.trim()) return;
    if (this.editingPerimetreId) {
      this.perimetres = this.perimetres.map((p) =>
        p.id === this.editingPerimetreId ? { ...this.perimetreForm, id: p.id } : p
      );
    } else {
      this.perimetres = [...this.perimetres, { ...this.perimetreForm, id: this.nextPerimetreId++ }];
    }
    this.showPerimetreDialog = false;
  }

  deletePerimetre(id: number) {
    this.perimetres = this.perimetres.filter((p) => p.id !== id);
    this.affectations = this.affectations.filter((a) => a.perimetreId !== id);
  }

  openAffectationDialog(aff?: Affectation) {
    if (aff) {
      this.editingAffectationId = aff.id;
      this.affectationForm = { ...aff };
    } else {
      this.editingAffectationId = null;
      this.affectationForm = { id: 0, collaborateurId: null, perimetreId: null, jours: 0 };
    }
    this.showAffectationDialog = true;
  }

  saveAffectation() {
    if (!this.affectationForm.collaborateurId || !this.affectationForm.perimetreId || this.affectationForm.jours <= 0) {
      return;
    }
    if (this.editingAffectationId) {
      this.affectations = this.affectations.map((a) =>
        a.id === this.editingAffectationId ? { ...this.affectationForm, id: a.id } : a
      );
    } else {
      this.affectations = [...this.affectations, { ...this.affectationForm, id: this.nextAffectationId++ }];
    }
    this.showAffectationDialog = false;
  }

  deleteAffectation(id: number) {
    this.affectations = this.affectations.filter((a) => a.id !== id);
  }

  openCollabDialog() {
    this.collabForm = { id: 0, nom: '', prenom: '', cout: 0, profilId: null };
    this.showCollabDialog = true;
  }

  saveCollaborateur() {
    if (!this.collabForm.nom.trim() || !this.collabForm.prenom.trim()) return;
    const newCol: Collaborateur = { ...this.collabForm, id: this.nextCollabId++ };
    this.collaborateursDispo = [...this.collaborateursDispo, newCol];
    this.showCollabDialog = false;
  }

  get collaborateurOptions() {
    return this.collaborateursDispo.map((c) => ({
      label: `${c.prenom} ${c.nom}`,
      value: c.id,
    }));
  }

  get perimetreOptions() {
    return this.perimetres.map((p) => ({ label: p.nom, value: p.id }));
  }
}
