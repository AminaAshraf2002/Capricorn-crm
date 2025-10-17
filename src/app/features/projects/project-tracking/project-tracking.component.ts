// src/app/features/projects/project-tracking/project-tracking.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Milestone {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  completedDate?: Date;
  expectedDate: Date;
  icon: string;
}

interface ProjectDetails {
  id: string;
  name: string;
  projectCode: string;
  customer: string;
  value: number;
  teamLeader: string;
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed';
  progress: number;
  startDate: Date;
  expectedCompletion: Date;
  siteAddress: string;
  elevatorType: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

@Component({
  selector: 'app-project-tracking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-tracking.component.html',
  styleUrls: ['./project-tracking.component.css']
})
export class ProjectTrackingComponent implements OnInit {
  projectId: string | null = null;
  
  // ✅ ADDED: Expose Math to template
  Math = Math;
  
  project: ProjectDetails = {
    id: 'PRJ-2024-001',
    name: 'Sunrise Mall Installation',
    projectCode: 'PRJ-2024-001',
    customer: 'Sunrise Mall Pvt Ltd',
    value: 4500000,
    teamLeader: 'Suresh Menon',
    status: 'in-progress',
    progress: 65,
    startDate: new Date('2024-11-01'),
    expectedCompletion: new Date('2024-12-15'),
    siteAddress: 'Sunrise Mall, MG Road, Kochi, Kerala - 682016',
    elevatorType: '15-Floor Passenger Elevator'
  };

  milestones: Milestone[] = [
    {
      id: '1',
      title: 'Site Survey & Measurement',
      status: 'completed',
      completedDate: new Date('2024-10-05'),
      expectedDate: new Date('2024-10-05'),
      icon: 'fa-ruler-combined'
    },
    {
      id: '2',
      title: 'Material Procurement',
      status: 'completed',
      completedDate: new Date('2024-10-20'),
      expectedDate: new Date('2024-10-20'),
      icon: 'fa-boxes'
    },
    {
      id: '3',
      title: 'Installation & Setup',
      status: 'in-progress',
      expectedDate: new Date('2024-11-20'),
      icon: 'fa-tools'
    },
    {
      id: '4',
      title: 'Testing & Commissioning',
      status: 'pending',
      expectedDate: new Date('2024-12-10'),
      icon: 'fa-clipboard-check'
    },
    {
      id: '5',
      title: 'Final Handover',
      status: 'pending',
      expectedDate: new Date('2024-12-15'),
      icon: 'fa-handshake'
    }
  ];

  teamMembers: TeamMember[] = [
    { id: '1', name: 'Suresh Menon', role: 'Team Leader' },
    { id: '2', name: 'Ravi Krishnan', role: 'Technician' },
    { id: '3', name: 'Manoj Kumar', role: 'Electrician' },
    { id: '4', name: 'Vinod Thomas', role: 'Helper' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.loadProjectData(this.projectId);
    }
  }

  loadProjectData(id: string): void {
    // Simulate API call - replace with actual service
    console.log('Loading project:', id);
    // TODO: this.projectService.getProject(id).subscribe(...)
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'planning': '#60a5fa',
      'in-progress': '#f59e0b',
      'on-hold': '#ec4899',
      'completed': '#22c55e'
    };
    return colors[status] || '#999';
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'planning': 'fa-clipboard-list',
      'in-progress': 'fa-spinner',
      'on-hold': 'fa-pause-circle',
      'completed': 'fa-check-circle'
    };
    return icons[status] || 'fa-circle';
  }

  getMilestoneIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'completed': 'fa-check-circle',
      'in-progress': 'fa-sync',
      'pending': 'fa-clock'
    };
    return icons[status] || 'fa-circle';
  }

  getCompletedMilestones(): number {
    return this.milestones.filter(m => m.status === 'completed').length;
  }

  getTotalMilestones(): number {
    return this.milestones.length;
  }

  updateStatus(): void {
    // Open modal or navigate to update form
    console.log('Update project status');
    alert('Status update functionality would open here');
  }

  markAsCompleted(): void {
    if (confirm('Are you sure you want to mark this project as completed?')) {
      this.project.status = 'completed';
      this.project.progress = 100;
      console.log('Project marked as completed');
      alert('Project marked as completed!');
      // TODO: API call to update project status
    }
  }

  viewDocuments(): void {
    console.log('View project documents');
    alert('Documents view would open here');
  }

  editProject(): void {
    this.router.navigate(['/projects/edit', this.project.id]);
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }

  formatCurrency(amount: number): string {
    return `₹${amount.toLocaleString('en-IN')}`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  getDaysRemaining(): number {
    const today = new Date();
    const completion = new Date(this.project.expectedCompletion);
    const diff = completion.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  getProgressColor(): string {
    if (this.project.progress >= 80) return '#22c55e';
    if (this.project.progress >= 50) return '#f59e0b';
    return '#ef4444';
  }
}