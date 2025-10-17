// src/app/features/quotations/quotation-builder/quotation-builder.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

interface ElevatorType {
  id: string;
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-quotation-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quotation-builder.component.html',
  styleUrls: ['./quotation-builder.component.css']
})
export class QuotationBuilderComponent implements OnInit {
  quotationForm!: FormGroup;
  currentStep: number = 1;
  isEditMode: boolean = false;
  quotationId: string | null = null;

elevatorTypes: ElevatorType[] = [
  {
    id: 'home',
    name: 'Home Lift',
    icon: '🏠',
    description: 'Compact elevator for private homes'
  },
  {
    id: 'commercial',
    name: 'Commercial Elevator',
    icon: '🏬',
    description: 'High-traffic elevators for commercial spaces'
  },
  {
    id: 'shaft-with',
    name: 'Elevator with Shaft',
    icon: '🔲',
    description: 'Traditional elevator requiring shaft construction'
  },
  {
    id: 'shaft-without',
    name: 'Shaftless Elevator',
    icon: '⬜',
    description: 'Modern elevator without traditional shaft requirements'
  }
];

  speedOptions = [
    { value: '1.0', label: '1.0 m/s' },
    { value: '1.5', label: '1.5 m/s' },
    { value: '2.0', label: '2.0 m/s' },
    { value: '2.5', label: '2.5 m/s' }
  ];

  capacityOptions = [
    { value: '630', label: '8 Persons (630 kg)' },
    { value: '800', label: '10 Persons (800 kg)' },
    { value: '1000', label: '13 Persons (1000 kg)' },
    { value: '1250', label: '16 Persons (1250 kg)' }
  ];

  driveTypes = [
    { value: 'vfd', label: 'VFD (Variable Frequency Drive)' },
    { value: 'geared', label: 'Geared Drive' },
    { value: 'gearless', label: 'Gearless Drive' }
  ];

  doorOptions = [
    { value: '1-front', label: '1 Door (Front Only)' },
    { value: '2-front-rear', label: '2 Doors (Front & Rear)' },
    { value: '3-doors', label: '3 Doors' }
  ];

  controlSystems = [
    { value: 'microprocessor', label: 'Microprocessor Based' },
    { value: 'plc', label: 'PLC Based' },
    { value: 'iot', label: 'IoT Enabled' }
  ];

  // Pricing
  basePrice: number = 0;
  installationCost: number = 0;
  amcCost: number = 0;
  subtotal: number = 0;
  cgst: number = 0;
  sgst: number = 0;
  totalAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Check if editing
    this.quotationId = this.route.snapshot.paramMap.get('id');
    if (this.quotationId) {
      this.isEditMode = true;
      this.loadQuotationData(this.quotationId);
    }
  }

  initForm(): void {
    this.quotationForm = this.fb.group({
      // Step 1: Customer Details
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', Validators.required],
      customerCompany: [''],
      customerAddress: [''],

      // Step 2: Elevator Configuration
      elevatorType: ['', Validators.required],
      floors: ['', [Validators.required, Validators.min(2)]],
      doors: ['', Validators.required],
      speed: ['', Validators.required],
      capacity: ['', Validators.required],
      driveType: ['', Validators.required],
      controlSystem: ['', Validators.required],

      // Step 3: Additional Options
      includeInstallation: [true],
      includeAmc: [true],
      amcYears: [1],
      specialRequirements: [''],
      notes: ['']
    });

    // Watch for changes to recalculate pricing
    this.quotationForm.valueChanges.subscribe(() => {
      this.calculatePricing();
    });
  }

  loadQuotationData(id: string): void {
    // Simulate loading data - replace with actual service call
    const mockData = {
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      customerPhone: '+91 9876543210',
      customerCompany: 'ABC Corporation',
      customerAddress: 'Kochi, Kerala',
      elevatorType: 'passenger',
      floors: 8,
      doors: '2-front-rear',
      speed: '1.0',
      capacity: '630',
      driveType: 'vfd',
      controlSystem: 'microprocessor',
      includeInstallation: true,
      includeAmc: true,
      amcYears: 1,
      specialRequirements: '',
      notes: ''
    };
    
    this.quotationForm.patchValue(mockData);
  }

  calculatePricing(): void {
    const formValues = this.quotationForm.value;
    
    if (!formValues.elevatorType || !formValues.floors) {
      return;
    }

    // Base price calculation (simplified)
    let base = 1000000; // Base price
    
    // Price per floor
    base += formValues.floors * 150000;
    
    // Elevator type multiplier
    const typeMultipliers: { [key: string]: number } = {
      'passenger': 1,
      'goods': 1.5,
      'home': 0.8,
      'hospital': 1.3
    };
    base *= typeMultipliers[formValues.elevatorType] || 1;

    // Speed adjustment
    const speedPrice: { [key: string]: number } = {
      '1.0': 0,
      '1.5': 150000,
      '2.0': 300000,
      '2.5': 450000
    };
    base += speedPrice[formValues.speed] || 0;

    // Capacity adjustment
    const capacityPrice: { [key: string]: number } = {
      '630': 0,
      '800': 100000,
      '1000': 200000,
      '1250': 350000
    };
    base += capacityPrice[formValues.capacity] || 0;

    this.basePrice = base;
    
    // Installation cost
    this.installationCost = formValues.includeInstallation 
      ? formValues.floors * 25000 
      : 0;
    
    // AMC cost
    this.amcCost = formValues.includeAmc 
      ? 50000 * formValues.amcYears 
      : 0;
    
    // Calculate totals
    this.subtotal = this.basePrice + this.installationCost + this.amcCost;
    this.cgst = this.subtotal * 0.09; // 9% CGST
    this.sgst = this.subtotal * 0.09; // 9% SGST
    this.totalAmount = this.subtotal + this.cgst + this.sgst;
  }

  nextStep(): void {
    if (this.currentStep === 1) {
      // Validate customer details
      const customerFields = ['customerName', 'customerEmail', 'customerPhone'];
      const isValid = customerFields.every(field => 
        this.quotationForm.get(field)?.valid
      );
      
      if (!isValid) {
        this.markFieldsAsTouched(customerFields);
        return;
      }
    }

    if (this.currentStep === 2) {
      // Validate elevator config
      const configFields = ['elevatorType', 'floors', 'doors', 'speed', 'capacity', 'driveType', 'controlSystem'];
      const isValid = configFields.every(field => 
        this.quotationForm.get(field)?.valid
      );
      
      if (!isValid) {
        this.markFieldsAsTouched(configFields);
        return;
      }
    }

    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  markFieldsAsTouched(fields: string[]): void {
    fields.forEach(field => {
      this.quotationForm.get(field)?.markAsTouched();
    });
  }

  selectElevatorType(typeId: string): void {
    this.quotationForm.patchValue({ elevatorType: typeId });
  }

  onSubmit(): void {
    if (this.quotationForm.valid) {
      const quotationData = {
        ...this.quotationForm.value,
        pricing: {
          basePrice: this.basePrice,
          installationCost: this.installationCost,
          amcCost: this.amcCost,
          subtotal: this.subtotal,
          cgst: this.cgst,
          sgst: this.sgst,
          totalAmount: this.totalAmount
        }
      };

      console.log('Quotation Data:', quotationData);
      
      // Navigate to preview
      this.router.navigate(['/quotations/preview'], { 
        state: { quotationData } 
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/quotations']);
  }

  formatCurrency(amount: number): string {
    return `₹${amount.toLocaleString('en-IN')}`;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.quotationForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}