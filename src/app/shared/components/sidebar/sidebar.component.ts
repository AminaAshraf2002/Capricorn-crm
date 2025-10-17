// src/app/shared/components/sidebar/sidebar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service'; // ✅ CORRECT PATH
import { Subject, takeUntil } from 'rxjs';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  currentLogo: string = 'assets/images/logo-light.png';
  private destroy$ = new Subject<void>();

  menuSections: MenuSection[] = [
    {
      title: 'Main',
      items: [
        { icon: 'fa-chart-line', label: 'Dashboard', route: '/dashboard' }
      ]
    },
    {
      title: 'Sales',
      items: [
        { icon: 'fa-users', label: 'Leads', route: '/leads' },
        { icon: 'fa-file-invoice', label: 'Quotations', route: '/quotations' },
        { icon: 'fa-handshake', label: 'Deals', route: '/deals' }
      ]
    },
    {
      title: 'Communication',
      items: [
        { icon: 'fa-calendar-alt', label: 'Activities', route: '/activities' },
        { icon: 'fa-tasks', label: 'Tasks', route: '/tasks' }
      ]
    },
    {
      title: 'Management',
      items: [
        { icon: 'fa-project-diagram', label: 'Projects', route: '/projects' },
        { icon: 'fa-chart-bar', label: 'Reports', route: '/reports' }
      ]
    },
    {
      title: 'System',
      items: [
        { icon: 'fa-cog', label: 'Settings', route: '/settings' }
      ]
    }
  ];

  constructor(
    public themeService: ThemeService,
    private router: Router
  ) {
    console.log('✅ Sidebar: Constructor called');
  }

  ngOnInit(): void {
    console.log('✅ Sidebar: ngOnInit called');
    
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: 'dark' | 'light') => {
        console.log('🎨 Theme changed to:', theme);
        
        if (theme === 'dark') {
          this.currentLogo = 'assets/images/logo1.png';
          console.log('   → Using logo-light.png');
        } else {
          this.currentLogo = 'assets/images/capricorn.png';
          console.log('   → Using logo-dark.png');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      console.log('🚪 Logging out...');
      localStorage.removeItem('auth_token');
      this.router.navigate(['/login']);
    }
  }
}