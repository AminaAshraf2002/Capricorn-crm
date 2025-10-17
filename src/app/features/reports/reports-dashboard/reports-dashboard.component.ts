// src/app/features/reports/reports-dashboard/reports-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ReportStat {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  trend: string;
  trendUp: boolean;
}

interface ChartData {
  labels: string[];
  values: number[];
}

@Component({
  selector: 'app-reports-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports-dashboard.component.html',
  styleUrls: ['./reports-dashboard.component.css']
})
export class ReportsDashboardComponent implements OnInit {
  selectedPeriod: string = 'month';
  
  stats: ReportStat[] = [
    {
      label: 'Total Revenue',
      value: '₹2.5Cr',
      icon: 'fa-rupee-sign',
      color: '#22c55e',
      trend: '15% vs last month',
      trendUp: true
    },
    {
      label: 'New Leads',
      value: 248,
      icon: 'fa-users',
      color: '#3b82f6',
      trend: '12% increase',
      trendUp: true
    },
    {
      label: 'Conversion Rate',
      value: '28%',
      icon: 'fa-chart-line',
      color: '#f59e0b',
      trend: '2% improvement',
      trendUp: true
    },
    {
      label: 'Avg Deal Size',
      value: '₹18.5L',
      icon: 'fa-coins',
      color: '#a855f7',
      trend: '8% increase',
      trendUp: true
    }
  ];

  // Sales Trend Data
  salesTrend: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    values: [120, 150, 180, 170, 200, 220, 250, 240, 280, 300]
  };

  // Lead Sources Data
  leadSources: { name: string; value: number; percentage: number; color: string }[] = [
    { name: 'Website', value: 98, percentage: 40, color: '#3b82f6' },
    { name: 'Walk-in', value: 74, percentage: 30, color: '#22c55e' },
    { name: 'Reference', value: 49, percentage: 20, color: '#f59e0b' },
    { name: 'Phone Call', value: 27, percentage: 10, color: '#a855f7' }
  ];

  // Deal Pipeline Data
  pipelineData: { stage: string; count: number; value: number; color: string }[] = [
    { stage: 'New', count: 45, value: 5200000, color: '#60a5fa' },
    { stage: 'Qualified', count: 32, value: 4800000, color: '#f59e0b' },
    { stage: 'Quoted', count: 28, value: 3500000, color: '#a855f7' },
    { stage: 'Negotiation', count: 15, value: 2800000, color: '#ec4899' },
    { stage: 'Won', count: 18, value: 4500000, color: '#22c55e' }
  ];

  // Top Performers Data
  topPerformers: { name: string; deals: number; revenue: number; avatar: string }[] = [
    { name: 'Priya Sharma', deals: 18, revenue: 9500000, avatar: '👩‍💼' },
    { name: 'Rajesh Kumar', deals: 15, revenue: 8500000, avatar: '👨‍💼' },
    { name: 'Amit Shah', deals: 12, revenue: 6800000, avatar: '👨‍💼' },
    { name: 'Vikram Singh', deals: 10, revenue: 5200000, avatar: '👨‍💼' }
  ];

  // Recent Activities
  recentActivities: { type: string; description: string; time: string; icon: string; color: string }[] = [
    { type: 'Deal Won', description: 'Sunrise Mall - ₹45L', time: '2 hours ago', icon: 'fa-trophy', color: '#22c55e' },
    { type: 'Quote Sent', description: 'Metro Hospital - ₹35L', time: '4 hours ago', icon: 'fa-file-invoice', color: '#3b82f6' },
    { type: 'Lead Added', description: 'Tech Park Ltd', time: '5 hours ago', icon: 'fa-user-plus', color: '#f59e0b' },
    { type: 'Project Started', description: 'Green Apartments Installation', time: '1 day ago', icon: 'fa-hammer', color: '#a855f7' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadReportData();
  }

  loadReportData(): void {
    // Simulate API call
    console.log('Loading report data for period:', this.selectedPeriod);
  }

  changePeriod(period: string): void {
    this.selectedPeriod = period;
    this.loadReportData();
  }

  navigateToCustomReport(): void {
    this.router.navigate(['/reports/custom']);
  }

  navigateToExport(): void {
    this.router.navigate(['/reports/export']);
  }

  formatCurrency(amount: number): string {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }

  getMaxValue(data: number[]): number {
    return Math.max(...data);
  }

  getBarHeight(value: number): number {
    const max = this.getMaxValue(this.salesTrend.values);
    return (value / max) * 100;
  }

  getTotalLeads(): number {
    return this.leadSources.reduce((sum, source) => sum + source.value, 0);
  }

  getPipelineTotal(): number {
    return this.pipelineData.reduce((sum, stage) => sum + stage.value, 0);
  }
}