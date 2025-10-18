// src/app/features/deals/deal-detail/deal-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Deal {
  id: string;
  title: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  amount: number;
  elevatorType: string;
  floors: number;
  quantity: number;
  status: string;
  probability: number;
  expectedCloseDate: string;
  assignedTo: string;
  leadSource: string;
  address: string;
  requirements: string;
  notes: string;
  createdAt: string;
}

interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'status_change';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  icon: string;
}

@Component({
  selector: 'app-deal-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.css']
})
export class DealDetailComponent implements OnInit {
  dealId: string | null = null;
  deal: Deal | null = null;
  activities: Activity[] = [];
  isLoading: boolean = true;

  // ✅ Mock database - matches pipeline data
  private mockDeals: Deal[] = [
    {
      id: '1',
      title: 'Luxury Apartment Complex',
      company: 'Prestige Group',
      contactPerson: 'Raj Kumar',
      email: 'raj@prestige.com',
      phone: '+91 9876543210',
      amount: 2500000,
      elevatorType: 'Passenger Elevator',
      floors: 12,
      quantity: 2,
      status: 'proposal',
      probability: 75,
      expectedCloseDate: '2024-12-15',
      assignedTo: 'John Doe',
      leadSource: 'Website',
      address: 'Whitefield, Bangalore, Karnataka - 560066',
      requirements: '12-floor passenger elevator with VFD control system, stainless steel cabin, and energy-efficient LED lighting',
      notes: 'Premium client. Interested in high-end finishes. Price-sensitive but values quality.',
      createdAt: '2024-09-01'
    },
    {
      id: '2',
      title: 'Corporate Office Building',
      company: 'Tech Park Ltd',
      contactPerson: 'Suresh Reddy',
      email: 'suresh@techpark.com',
      phone: '+91 9876543211',
      amount: 3200000,
      elevatorType: 'High-Speed Elevator',
      floors: 20,
      quantity: 3,
      status: 'negotiation',
      probability: 90,
      expectedCloseDate: '2024-11-30',
      assignedTo: 'Jane Smith',
      leadSource: 'Reference',
      address: 'Bandra Kurla Complex, Mumbai, Maharashtra - 400051',
      requirements: '20-floor high-speed elevator system with destination dispatch technology and smart building integration',
      notes: 'Hot lead! Decision makers are eager. Final negotiation on payment terms.',
      createdAt: '2024-08-15'
    },
    {
      id: '3',
      title: 'Shopping Mall Expansion',
      company: 'Phoenix Mills',
      contactPerson: 'Amit Shah',
      email: 'amit@phoenixmalls.com',
      phone: '+91 9876543212',
      amount: 1800000,
      elevatorType: 'Freight Elevator',
      floors: 5,
      quantity: 1,
      status: 'qualified',
      probability: 50,
      expectedCloseDate: '2025-01-20',
      assignedTo: 'Mike Johnson',
      leadSource: 'Walk-in',
      address: 'Lower Parel, Mumbai, Maharashtra - 400013',
      requirements: '5-floor freight elevator for heavy goods transport, 2000kg capacity with reinforced cabin',
      notes: 'Budget constraints. May need to adjust pricing. Timeline is flexible.',
      createdAt: '2024-09-10'
    },
    {
      id: '4',
      title: 'Sunrise Mall',
      company: 'Sunrise Mall Pvt Ltd',
      contactPerson: 'John Smith',
      email: 'john@sunrisemall.com',
      phone: '+91 9876543215',
      amount: 4500000,
      elevatorType: '15-Floor Passenger Elevator',
      floors: 15,
      quantity: 4,
      status: 'won',
      probability: 100,
      expectedCloseDate: '2024-10-18',
      assignedTo: 'Amit Shah',
      leadSource: 'Reference',
      address: 'MG Road, Kochi, Kerala - 682016',
      requirements: '15-floor passenger elevator with VFD control system, touchless buttons, energy-efficient LED lighting, and premium glass cabin',
      notes: 'Deal won! Customer signed contract. Ready for project conversion. Excellent relationship.',
      createdAt: '2024-09-01'
    },
    {
      id: '5',
      title: 'Budget Housing Project',
      company: 'ABC Builders',
      contactPerson: 'Ramesh Kumar',
      email: 'ramesh@abc.com',
      phone: '+91 9876543213',
      amount: 1200000,
      elevatorType: 'Passenger Elevator',
      floors: 8,
      quantity: 1,
      status: 'lost',
      probability: 0,
      expectedCloseDate: '2024-09-15',
      assignedTo: 'Mike Johnson',
      leadSource: 'Phone Call',
      address: 'Ghatkopar, Mumbai, Maharashtra - 400086',
      requirements: '8-floor basic passenger elevator, minimal features to keep costs low',
      notes: 'Lost to competitor due to pricing. Customer went with cheaper alternative.',
      createdAt: '2024-08-01'
    },
    {
      id: '6',
      title: 'Residential Tower Project',
      company: 'Skyline Developers',
      contactPerson: 'Vijay Singh',
      email: 'vijay@skyline.com',
      phone: '+91 9876543214',
      amount: 3500000,
      elevatorType: 'Passenger Elevator',
      floors: 18,
      quantity: 2,
      status: 'lead',
      probability: 25,
      expectedCloseDate: '2025-02-10',
      assignedTo: 'Priya Sharma',
      leadSource: 'Website',
      address: 'Andheri West, Mumbai, Maharashtra - 400058',
      requirements: '18-floor residential elevator with modern design, spacious cabin, and safety features',
      notes: 'New lead. Initial contact made. Need to schedule site visit.',
      createdAt: '2024-10-15'
    }
  ];

  statusOptions = [
    { value: 'lead', label: 'Lead', color: '#60a5fa' },
    { value: 'qualified', label: 'Qualified', color: '#a855f7' },
    { value: 'proposal', label: 'Proposal', color: '#f59e0b' },
    { value: 'negotiation', label: 'Negotiation', color: '#ec4899' },
    { value: 'won', label: 'Won', color: '#22c55e' },
    { value: 'lost', label: 'Lost', color: '#ef4444' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dealId = this.route.snapshot.paramMap.get('id');
    if (this.dealId) {
      this.loadDealDetails(this.dealId);
      this.loadActivities(this.dealId);
    }
  }

  loadDealDetails(id: string): void {
    // ✅ Find deal by ID from mock database
    setTimeout(() => {
      const foundDeal = this.mockDeals.find(d => d.id === id);
      
      if (foundDeal) {
        this.deal = foundDeal;
      } else {
        this.deal = null;
      }
      
      this.isLoading = false;
    }, 500);

    // TODO: Replace with actual API call
    // this.dealService.getDealById(id).subscribe(
    //   (data) => {
    //     this.deal = data;
    //     this.isLoading = false;
    //   },
    //   (error) => {
    //     console.error('Error loading deal:', error);
    //     this.deal = null;
    //     this.isLoading = false;
    //   }
    // );
  }

  loadActivities(dealId: string): void {
  // ✅ Generate activities based on deal status
  const deal = this.mockDeals.find(d => d.id === dealId);
  if (!deal) return;

  // ✅ FIX: Explicitly type the array
  const baseActivities: Activity[] = [
    {
      id: '1',
      type: 'note',
      title: 'Lead Created',
      description: `New lead captured from ${deal.leadSource}. Initial contact established with ${deal.contactPerson}.`,
      timestamp: deal.createdAt + 'T09:30:00',
      user: 'System',
      icon: 'fa-sticky-note'
    }
  ];

  // Add status-specific activities
  if (deal.status === 'qualified' || deal.status === 'proposal' || deal.status === 'negotiation' || deal.status === 'won') {
    baseActivities.unshift({
      id: '2',
      type: 'call',
      title: 'Qualification Call',
      description: `Discussed requirements with ${deal.contactPerson}. Customer needs ${deal.elevatorType} for ${deal.floors} floors.`,
      timestamp: this.addDays(deal.createdAt, 2) + 'T11:00:00',
      user: deal.assignedTo,
      icon: 'fa-phone'
    });
  }

  if (deal.status === 'proposal' || deal.status === 'negotiation' || deal.status === 'won') {
    baseActivities.unshift({
      id: '3',
      type: 'meeting',
      title: 'Site Visit',
      description: `Conducted site survey at ${deal.address.split(',')[0]}. Measured shaft dimensions and discussed installation requirements.`,
      timestamp: this.addDays(deal.createdAt, 5) + 'T10:00:00',
      user: deal.assignedTo,
      icon: 'fa-handshake'
    });

    baseActivities.unshift({
      id: '4',
      type: 'email',
      title: 'Quotation Sent',
      description: `Sent detailed quotation for ${deal.quantity} ${deal.elevatorType}(s) with specifications and pricing breakdown.`,
      timestamp: this.addDays(deal.createdAt, 7) + 'T16:45:00',
      user: deal.assignedTo,
      icon: 'fa-envelope'
    });
  }

  if (deal.status === 'negotiation' || deal.status === 'won') {
    baseActivities.unshift({
      id: '5',
      type: 'call',
      title: 'Negotiation Call',
      description: 'Discussed pricing, payment terms, and installation timeline. Customer requested minor adjustments.',
      timestamp: this.addDays(deal.createdAt, 10) + 'T14:30:00',
      user: deal.assignedTo,
      icon: 'fa-phone'
    });
  }

  if (deal.status === 'won') {
    baseActivities.unshift({
      id: '6',
      type: 'status_change',
      title: 'Deal Won',
      description: `Contract signed! Deal worth ${this.formatCurrency(deal.amount)} closed successfully.`,
      timestamp: this.addDays(deal.createdAt, 15) + 'T11:00:00',
      user: deal.assignedTo,
      icon: 'fa-trophy'
    });
  }

  if (deal.status === 'lost') {
    baseActivities.unshift({
      id: '7',
      type: 'status_change',
      title: 'Deal Lost',
      description: 'Customer decided to go with a competitor. Reason: Better pricing offered by competitor.',
      timestamp: this.addDays(deal.createdAt, 12) + 'T16:00:00',
      user: deal.assignedTo,
      icon: 'fa-times-circle'
    });
  }

  this.activities = baseActivities;
}

  // Helper function to add days to a date
  addDays(dateString: string, days: number): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  editDeal(): void {
    if (this.dealId) {
      this.router.navigate(['/deals/edit', this.dealId]);
    }
  }

  deleteDeal(): void {
    if (confirm('Are you sure you want to delete this deal? This action cannot be undone.')) {
      console.log('Deleting deal:', this.dealId);
      this.router.navigate(['/deals']);
    }
  }

  convertToProject(): void {
    if (this.deal) {
      this.router.navigate(['/projects/create'], {
        state: {
          deal: {
            id: this.deal.id,
            title: this.deal.title,
            company: this.deal.company,
            amount: this.deal.amount,
            elevatorType: this.deal.elevatorType,
            contactPerson: this.deal.contactPerson,
            phone: this.deal.phone,
            email: this.deal.email
          }
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/deals']);
  }

  getStatusColor(status: string): string {
    const statusOption = this.statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.color : '#666';
  }

  getStatusLabel(status: string): string {
    const statusOption = this.statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.label : status;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  }
}