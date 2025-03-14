import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() sidenav!: MatSidenav;

  closeSidenav() {
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }
}
