import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-charges',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, DividerModule, TagModule],
  templateUrl: './charges.component.html',
  styleUrl: './charges.component.scss',
})
export class ChargesComponent {}
