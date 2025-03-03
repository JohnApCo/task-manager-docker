import { AfterViewInit, ChangeDetectorRef, Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  sidenavMode: 'over' | 'side' = 'side';
  isDarkTheme: boolean;

  constructor(private themeService: ThemeService, private cdr : ChangeDetectorRef) {
    this.isDarkTheme = this.themeService.getTheme() === 'dark-theme';
  }

  ngAfterViewInit() {
    this.onResize();
    this.cdr.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (!this.sidenav) return;
    if (window.innerWidth < 768) {
      this.sidenavMode = 'over';
      this.sidenav.close(); // Pantallas pequeñas: cerrado
    } else {
      this.sidenavMode = 'side';
      this.sidenav.open(); // Pantallas grandes: abierto
    }
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkTheme = !this.isDarkTheme;
  }
}
