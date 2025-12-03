import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

type Client = {
  id: number;
  raisonSociale: string;
  logoUrl: string;
  adresse: string;
};

@Component({
  selector: 'app-clients',
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
    TagModule,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  clients: Client[] = [
    {
      id: 1,
      raisonSociale: 'Acme Corp',
      logoUrl: 'https://placehold.co/48x48',
      adresse: '10 rue de la Paix, Paris',
    },
    {
      id: 2,
      raisonSociale: 'Globex',
      logoUrl: 'https://placehold.co/48x48',
      adresse: '20 avenue des Champs, Lyon',
    },
  ];

  showClientDialog = false;
  editingClientId: number | null = null;
  nextClientId = 3;

  clientForm: Client = { id: 0, raisonSociale: '', logoUrl: '', adresse: '' };

  openClientDialog(client?: Client) {
    if (client) {
      this.editingClientId = client.id;
      this.clientForm = { ...client };
    } else {
      this.editingClientId = null;
      this.clientForm = { id: 0, raisonSociale: '', logoUrl: '', adresse: '' };
    }
    this.showClientDialog = true;
  }

  saveClient() {
    if (!this.clientForm.raisonSociale.trim()) return;

    if (this.editingClientId) {
      this.clients = this.clients.map((c) => (c.id === this.editingClientId ? { ...this.clientForm, id: c.id } : c));
    } else {
      this.clients = [...this.clients, { ...this.clientForm, id: this.nextClientId++ }];
    }
    this.showClientDialog = false;
  }

  deleteClient(id: number) {
    this.clients = this.clients.filter((c) => c.id !== id);
  }
}
