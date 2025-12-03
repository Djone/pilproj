import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ChargesComponent } from './pages/charges/charges.component';
import { ImputationsComponent } from './pages/imputations/imputations.component';
import { CollaborateursComponent } from './pages/collaborateurs/collaborateurs.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent },
  { path: 'projets', component: ProjectsComponent },
  { path: 'charges', component: ChargesComponent },
  { path: 'imputations', component: ImputationsComponent },
  { path: 'collaborateurs', component: CollaborateursComponent },
  { path: '**', redirectTo: '' },
];
