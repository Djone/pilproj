import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MenubarModule, ButtonModule, AvatarModule, TagModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Pilotage projet';

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Clients', icon: 'pi pi-building', routerLink: '/clients' },
    { label: 'Projets', icon: 'pi pi-briefcase', routerLink: '/projets' },
    { label: 'Charges', icon: 'pi pi-chart-bar', routerLink: '/charges' },
    { label: 'Imputations', icon: 'pi pi-calendar', routerLink: '/imputations' },
    { label: 'Collaborateurs', icon: 'pi pi-users', routerLink: '/collaborateurs' },
  ];
}
