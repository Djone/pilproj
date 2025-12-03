import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';

type KpiCard = {
  label: string;
  value: string;
  delta?: string;
  severity?: 'success' | 'info' | 'warn' | 'danger';
};

type PerimeterProgress = {
  name: string;
  realized: number;
  raf: number;
  budget: number;
};

type StaffingRow = {
  actor: string;
  role: string;
  category: string;
  etpPlan: number;
  etpReal: number;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    ProgressBarModule,
    TableModule,
    TagModule,
    DividerModule,
    AvatarModule,
    BadgeModule,
    ButtonModule,
    DatePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  today = new Date();

  kpis: KpiCard[] = [
    { label: 'Budget total', value: '247 139 €', delta: '+0%', severity: 'info' },
    { label: 'Consommé', value: '214 964 €', delta: '87%', severity: 'warn' },
    { label: 'RAF (révisé)', value: '64 j.h / 32 000 €', severity: 'info' },
    { label: 'ETP actuel', value: '4,48', severity: 'success' },
  ];

  perimeters: PerimeterProgress[] = [
    { name: 'Pilotage', realized: 87, raf: 7.7, budget: 29_275 },
    { name: 'Expert Tech', realized: 84, raf: 12.4, budget: 36_069 },
    { name: 'Dev', realized: 88, raf: 36.4, budget: 121_864 },
    { name: 'DevOps', realized: 87, raf: 7.6, budget: 27_754 },
  ];

  staffing: StaffingRow[] = [
    { actor: 'Collab 1', role: 'Direction de projet', category: 'Pilotage', etpPlan: 0.05, etpReal: 0.05 },
    { actor: 'Collab 2', role: 'Gestion / Scrum master', category: 'Pilotage', etpPlan: 0.05, etpReal: 0.50 },
    { actor: 'Collab 3', role: 'Coordination / Support', category: 'Expert Tech', etpPlan: 0.75, etpReal: 0.39 },
    { actor: 'Collab N', role: 'Lead BO', category: 'Expert Tech', etpPlan: 0.10, etpReal: 0.10 },
    { actor: 'Collab N', role: 'Développement', category: 'Dev', etpPlan: 3.00, etpReal: 3.25 },
    { actor: 'Collab N', role: 'DevOps', category: 'DevOps', etpPlan: 0.05, etpReal: 0.19 },
  ];

  costChartData = {
    labels: ['Pilotage', 'Expert Tech', 'Dev', 'DevOps'],
    datasets: [
      {
        type: 'bar' as const,
        label: 'Initial (€)',
        backgroundColor: '#43a047',
        data: [33_843, 25_811, 138_273, 32_004],
      },
      {
        type: 'bar' as const,
        label: 'Réalisé (€)',
        backgroundColor: '#0d47a1',
        data: [29_275, 36_069, 121_864, 27_754],
      },
    ],
  };

  costChartOptions = {
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        ticks: {
          callback: (value: number) => `${value.toLocaleString('fr-FR')} €`,
        },
      },
    },
  };

  weeklyLoadData = {
    labels: ['S19', 'S20', 'S21', 'S22', 'S23', 'S24'],
    datasets: [
      {
        label: 'Capacité (j.h)',
        data: [3, 11.7, 11.8, 9.1, 17.9, 13.6],
        fill: false,
        borderColor: '#00897b',
        tension: 0.3,
      },
      {
        label: 'Imputé (j.h)',
        data: [3, 11.7, 11.8, 9.1, 17.9, 13.6],
        fill: true,
        backgroundColor: 'rgba(0,137,123,0.1)',
        borderColor: '#26a69a',
        tension: 0.3,
      },
    ],
  };

  rowSeverity(value: number): 'success' | 'warn' | 'danger' {
    if (value >= 90) return 'success';
    if (value >= 80) return 'warn';
    return 'danger';
  }
}
