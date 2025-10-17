import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {
  stats = [
    { icon: 'fa-users', label: 'Total Leads', value: '248', change: '+12%', trend: 'up' },
    { icon: 'fa-handshake', label: 'Active Deals', value: '42', change: '0%', trend: 'neutral' },
    { icon: 'fa-file-invoice', label: 'Quotes Sent', value: '67', change: '+8%', trend: 'up' },
    { icon: 'fa-trophy', label: 'Won Deals', value: '18', change: '+5', trend: 'up' }
  ];
}