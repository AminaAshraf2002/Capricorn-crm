// src/app/features/communication/activity-log/activity-log.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  title: string;
  description: string;
  timestamp: Date;
  user: string;
  duration?: string;
  attachment?: string;
  leadId?: string;
  leadName?: string;
}

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  activityForm!: FormGroup;
  showAddForm: boolean = false;
  filterType: string = '';
  leadId: string | null = null;

  activities: Activity[] = [
    {
      id: '1',
      type: 'call',
      title: 'Phone Call - Follow-up',
      description: 'Discussed technical specifications for the elevator. Customer interested in 8-floor passenger elevator with VFD drive.',
      timestamp: new Date('2024-10-10T14:30:00'),
      user: 'Rajesh Kumar',
      duration: '15 mins',
      leadId: 'LD-2024-001',
      leadName: 'John Smith'
    },
    {
      id: '2',
      type: 'email',
      title: 'Email Sent - Quotation',
      description: 'Sent detailed quotation for 8-floor elevator with specifications and pricing breakdown.',
      timestamp: new Date('2024-10-09T11:00:00'),
      user: 'Rajesh Kumar',
      attachment: 'Quote_ABC_001.pdf',
      leadId: 'LD-2024-001',
      leadName: 'John Smith'
    },
    {
      id: '3',
      type: 'meeting',
      title: 'Site Visit',
      description: 'Conducted site survey at ABC Corporation office. Measured shaft dimensions and discussed installation timeline.',
      timestamp: new Date('2024-10-08T10:00:00'),
      user: 'Rajesh Kumar',
      duration: '2 hours',
      leadId: 'LD-2024-001',
      leadName: 'John Smith'
    },
    {
      id: '4',
      type: 'call',
      title: 'Initial Contact Call',
      description: 'Customer called to inquire about elevator options. Scheduled site visit.',
      timestamp: new Date('2024-10-07T15:30:00'),
      user: 'Rajesh Kumar',
      duration: '10 mins',
      leadId: 'LD-2024-002',
      leadName: 'Sarah Johnson'
    },
    {
      id: '5',
      type: 'meeting',
      title: 'Product Demo',
      description: 'Showed elevator features and capabilities. Customer very interested in premium model.',
      timestamp: new Date('2024-10-06T14:00:00'),
      user: 'Amit Shah',
      duration: '45 mins',
      leadId: 'LD-2024-003',
      leadName: 'Michael Brown'
    },
    {
      id: '6',
      type: 'email',
      title: 'Follow-up Email',
      description: 'Sent thank you email and additional product information.',
      timestamp: new Date('2024-10-05T09:15:00'),
      user: 'Priya Sharma',
      leadId: 'LD-2024-004',
      leadName: 'Emily Davis'
    },
    {
      id: '7',
      type: 'note',
      title: 'Customer Note',
      description: 'Customer mentioned budget constraints. Need to prepare alternate quotation.',
      timestamp: new Date('2024-10-04T16:20:00'),
      user: 'Vikram Singh',
      leadId: 'LD-2024-005',
      leadName: 'David Wilson'
    }
  ];

  filteredActivities: Activity[] = [];

  activityTypes = [
    { value: 'call', label: 'Phone Call', icon: 'fa-phone' },
    { value: 'email', label: 'Email', icon: 'fa-envelope' },
    { value: 'meeting', label: 'Meeting', icon: 'fa-users' },
    { value: 'note', label: 'Note', icon: 'fa-sticky-note' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.leadId = this.route.snapshot.paramMap.get('leadId');
    this.filterActivities();
  }

  initForm(): void {
    this.activityForm = this.fb.group({
      type: ['call', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: [''],
      leadId: ['']
    });
  }

  filterActivities(): void {
    this.filteredActivities = this.activities.filter(activity => {
      const matchesType = !this.filterType || activity.type === this.filterType;
      const matchesLead = !this.leadId || activity.leadId === this.leadId;
      return matchesType && matchesLead;
    });
  }

  filterByType(type: string): void {
    this.filterType = this.filterType === type ? '' : type;
    this.filterActivities();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.activityForm.reset({ type: 'call' });
    }
  }

  onSubmit(): void {
    if (this.activityForm.valid) {
      const formData = this.activityForm.value;
      
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: formData.type,
        title: formData.title,
        description: formData.description,
        timestamp: new Date(),
        user: 'Current User', // Get from auth service
        duration: formData.duration,
        leadId: formData.leadId
      };

      this.activities.unshift(newActivity);
      this.filterActivities();
      this.toggleAddForm();
      
      alert('Activity logged successfully!');
    }
  }

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'call': 'fa-phone',
      'email': 'fa-envelope',
      'meeting': 'fa-users',
      'note': 'fa-sticky-note'
    };
    return icons[type] || 'fa-circle';
  }

  getActivityColor(type: string): string {
    const colors: { [key: string]: string } = {
      'call': '#60a5fa',
      'email': '#c084fc',
      'meeting': '#fb923c',
      'note': '#4ade80'
    };
    return colors[type] || '#d4b347';
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return `${minutes} minutes ago`;
      }
      return `${hours} hours ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  }

  viewLead(leadId: string): void {
    this.router.navigate(['/leads', leadId]);
  }

  deleteActivity(activityId: string): void {
    if (confirm('Are you sure you want to delete this activity?')) {
      this.activities = this.activities.filter(a => a.id !== activityId);
      this.filterActivities();
    }
  }
}