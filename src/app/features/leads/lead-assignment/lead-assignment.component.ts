// src/app/features/leads/lead-assignment/lead-assignment.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  selected: boolean;
}

interface SalesPerson {
  id: string;
  name: string;
  email: string;
  activeLeads: number;
  avatar?: string;
}

@Component({
  selector: 'app-lead-assignment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lead-assignment.component.html',
  styleUrls: ['./lead-assignment.component.css']
})
export class LeadAssignmentComponent implements OnInit {
  assignmentForm!: FormGroup;
  
  leads: Lead[] = [
    {
      id: 'LD-2024-001',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+91 9876543210',
      source: 'Website',
      status: 'new',
      selected: false
    },
    {
      id: 'LD-2024-002',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+91 9876543211',
      source: 'Walk-in',
      status: 'new',
      selected: false
    },
    {
      id: 'LD-2024-003',
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+91 9876543212',
      source: 'Reference',
      status: 'new',
      selected: false
    },
    {
      id: 'LD-2024-004',
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+91 9876543213',
      source: 'Phone',
      status: 'new',
      selected: false
    },
    {
      id: 'LD-2024-005',
      name: 'David Wilson',
      email: 'david@example.com',
      phone: '+91 9876543214',
      source: 'Website',
      status: 'new',
      selected: false
    }
  ];

  salesPersons: SalesPerson[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@inspitetech.com',
      activeLeads: 12
    },
    {
      id: '2',
      name: 'Amit Shah',
      email: 'amit@inspitetech.com',
      activeLeads: 8
    },
    {
      id: '3',
      name: 'Priya Sharma',
      email: 'priya@inspitetech.com',
      activeLeads: 15
    },
    {
      id: '4',
      name: 'Vikram Singh',
      email: 'vikram@inspitetech.com',
      activeLeads: 10
    }
  ];

  selectAll = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.assignmentForm = this.fb.group({
      salesPerson: ['', Validators.required],
      notes: ['']
    });
  }

  toggleSelectAll(): void {
    this.selectAll = !this.selectAll;
    this.leads.forEach(lead => lead.selected = this.selectAll);
  }

  toggleLeadSelection(lead: Lead): void {
    lead.selected = !lead.selected;
    this.updateSelectAllState();
  }

  updateSelectAllState(): void {
    this.selectAll = this.leads.every(lead => lead.selected);
  }

  get selectedLeads(): Lead[] {
    return this.leads.filter(lead => lead.selected);
  }

  get selectedCount(): number {
    return this.selectedLeads.length;
  }

  removeSelectedLead(leadId: string): void {
    const lead = this.leads.find(l => l.id === leadId);
    if (lead) {
      lead.selected = false;
      this.updateSelectAllState();
    }
  }

  onSubmit(): void {
    if (this.assignmentForm.valid && this.selectedCount > 0) {
      const formData = this.assignmentForm.value;
      const selectedLeadIds = this.selectedLeads.map(lead => lead.id);
      
      const assignmentData = {
        salesPersonId: formData.salesPerson,
        leadIds: selectedLeadIds,
        notes: formData.notes
      };

      console.log('Assignment Data:', assignmentData);
      
      // Show success message
      alert(`Successfully assigned ${this.selectedCount} lead(s) to ${this.getSelectedSalesPersonName()}`);
      
      // Navigate back to leads list
      this.router.navigate(['/leads']);
    } else if (this.selectedCount === 0) {
      alert('Please select at least one lead to assign');
    } else {
      alert('Please select a sales person');
    }
  }

  onCancel(): void {
    this.router.navigate(['/leads']);
  }

  getSelectedSalesPersonName(): string {
    const salesPersonId = this.assignmentForm.get('salesPerson')?.value;
    const salesPerson = this.salesPersons.find(sp => sp.id === salesPersonId);
    return salesPerson ? salesPerson.name : '';
  }

  autoAssign(): void {
    if (this.selectedCount === 0) {
      alert('Please select at least one lead first');
      return;
    }

    // Find sales person with least active leads
    const leastBusySalesPerson = this.salesPersons.reduce((prev, current) => 
      prev.activeLeads < current.activeLeads ? prev : current
    );

    this.assignmentForm.patchValue({
      salesPerson: leastBusySalesPerson.id
    });

    alert(`Auto-assigned to ${leastBusySalesPerson.name} (${leastBusySalesPerson.activeLeads} active leads)`);
  }
}