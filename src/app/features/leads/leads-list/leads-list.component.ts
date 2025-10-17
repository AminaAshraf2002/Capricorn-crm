// src/app/features/leads/leads-list/leads-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: string;
  assignedTo: string;
}

@Component({
  selector: 'app-leads-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.css']
})
export class LeadsListComponent implements OnInit {
  searchTerm: string = '';
  statusFilter: string = '';
  sourceFilter: string = '';

  leads: Lead[] = [
    {
      id: 'LD-2024-001',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+91 9876543210',
      company: 'ABC Corporation',
      source: 'Website',
      status: 'new',
      assignedTo: 'Rajesh Kumar'
    },
    {
      id: 'LD-2024-002',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+91 9876543211',
      company: 'XYZ Industries',
      source: 'Walk-in',
      status: 'qualified',
      assignedTo: 'Amit Shah'
    },
    {
      id: 'LD-2024-003',
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+91 9876543212',
      company: 'Tech Solutions',
      source: 'Reference',
      status: 'quoted',
      assignedTo: 'Priya Sharma'
    },
    {
      id: 'LD-2024-004',
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+91 9876543213',
      company: 'Global Enterprises',
      source: 'Phone',
      status: 'won',
      assignedTo: 'Vikram Singh'
    },
    {
      id: 'LD-2024-005',
      name: 'David Wilson',
      email: 'david@example.com',
      phone: '+91 9876543214',
      company: 'Innovation Hub',
      source: 'Website',
      status: 'new',
      assignedTo: 'Rajesh Kumar'
    },
    {
      id: 'LD-2024-006',
      name: 'Jessica Martinez',
      email: 'jessica@example.com',
      phone: '+91 9876543215',
      company: 'Digital Systems',
      source: 'Walk-in',
      status: 'qualified',
      assignedTo: 'Amit Shah'
    },
    {
      id: 'LD-2024-007',
      name: 'Robert Taylor',
      email: 'robert@example.com',
      phone: '+91 9876543216',
      company: 'Smart Solutions',
      source: 'Reference',
      status: 'lost',
      assignedTo: 'Priya Sharma'
    },
    {
      id: 'LD-2024-008',
      name: 'Amanda White',
      email: 'amanda@example.com',
      phone: '+91 9876543217',
      company: 'Future Tech',
      source: 'Website',
      status: 'new',
      assignedTo: 'Vikram Singh'
    }
  ];

  filteredLeads: Lead[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredLeads = [...this.leads];
  }

  filterLeads(): void {
    this.filteredLeads = this.leads.filter(lead => {
      const matchesSearch = !this.searchTerm || 
        lead.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lead.phone.includes(this.searchTerm) ||
        lead.company.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = !this.statusFilter || lead.status === this.statusFilter;
      const matchesSource = !this.sourceFilter || lead.source === this.sourceFilter;

      return matchesSearch && matchesStatus && matchesSource;
    });
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'new': 'New',
      'qualified': 'Qualified',
      'quoted': 'Quoted',
      'won': 'Won',
      'lost': 'Lost'
    };
    return labels[status] || status;
  }

  addNewLead(): void {
    this.router.navigate(['/leads/add']);
  }

  assignLeads(): void {
    this.router.navigate(['/leads/assign']);
  }

  viewLead(leadId: string): void {
    this.router.navigate(['/leads', leadId]);
  }

  editLead(leadId: string): void {
    this.router.navigate(['/leads/edit', leadId]);
  }

  deleteLead(leadId: string): void {
    if (confirm(`Are you sure you want to delete lead ${leadId}?`)) {
      this.leads = this.leads.filter(lead => lead.id !== leadId);
      this.filterLeads();
      console.log(`Lead ${leadId} deleted`);
    }
  }

  importLeads(): void {
    this.router.navigate(['/leads/import']);  // ← UPDATED
  }

  exportLeads(): void {
    console.log('Export leads functionality');
    alert('Export leads feature coming soon!');
  }
}