// src/app/layouts/main-layout/main-layout.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component'; // ✅ CORRECT
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, HeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  
  constructor(public themeService: ThemeService) {
    console.log(' Main Layout: Constructor');
  }

  ngOnInit(): void {
    console.log('Main Layout: Initialized with theme:', this.themeService.getCurrentTheme());
  }
}