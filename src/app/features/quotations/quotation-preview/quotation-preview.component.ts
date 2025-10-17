// src/app/features/quotations/quotation-preview/quotation-preview.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface QuotationItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Customer {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

interface QuotationData {
  quoteNumber: string;
  date: string;
  validUntil: string;
  customer: Customer;
  items: QuotationItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  total: number;
}

@Component({
  selector: 'app-quotation-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotation-preview.component.html',
  styleUrls: ['./quotation-preview.component.css']
})
export class QuotationPreviewComponent implements OnInit {
  quotationData: QuotationData = {
    quoteNumber: 'QT-2024-001',
    date: 'Oct 2, 2024',
    validUntil: 'Nov 2, 2024',
    customer: {
      name: 'John Smith',
      company: 'ABC Corporation',
      email: 'john@example.com',
      phone: '+91 9876543210',
      address: 'Infopark, Kochi, Kerala - 682042'
    },
    items: [
      {
        description: '8-Floor Passenger Elevator',
        quantity: 1,
        rate: 1200000,
        amount: 1200000
      },
      {
        description: 'VFD Control System',
        quantity: 1,
        rate: 150000,
        amount: 150000
      },
      {
        description: 'Installation & Commissioning',
        quantity: 1,
        rate: 200000,
        amount: 200000
      },
      {
        description: '1 Year AMC',
        quantity: 1,
        rate: 50000,
        amount: 50000
      }
    ],
    subtotal: 1550000,
    cgst: 139500,
    sgst: 139500,
    total: 1829000
  };

  companyInfo = {
    name: 'Capricorn Elavators',
    address: '11th floor, Jomer Symphony, Unit 03, Ponnurunni East, Vyttila, Ernakulam, Kerala 682019',
    phone: ' 075930 00222',
    website: 'capricornelevators.com',
    gst: 'GST123456789'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Load quotation data from service or route params
    this.loadQuotationData();
  }

  loadQuotationData(): void {
    // Check if data passed via navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const quotationData = navigation.extras.state['quotationData'];
      if (quotationData) {
        this.quotationData = quotationData;
      }
    } else {
      // Load from localStorage as fallback
      const savedData = localStorage.getItem('quotationPreview');
      if (savedData) {
        this.quotationData = JSON.parse(savedData);
      }
    }
  }

  formatCurrency(amount: number): string {
    return `₹${amount.toLocaleString('en-IN')}`;
  }

  downloadPDF(): void {
    console.log('Downloading PDF...');
    // TODO: Implement PDF generation using jsPDF library
    // Example implementation:
    // import jsPDF from 'jspdf';
    // const doc = new jsPDF();
    // Add content to PDF
    // doc.save('quotation-' + this.quotationData.quoteNumber + '.pdf');
    
    alert('PDF download functionality will be implemented with jsPDF library');
  }

  sendEmail(): void {
    console.log('Sending email to:', this.quotationData.customer.email);
    
    // TODO: Implement email sending via backend API
    // Example API call:
    // this.quotationService.sendQuotationEmail(this.quotationData)
    //   .subscribe(response => {
    //     console.log('Email sent successfully');
    //     this.showSuccessMessage('Quotation email sent successfully!');
    //   });
    
    alert(`Email will be sent to ${this.quotationData.customer.email}`);
  }

  editQuotation(): void {
    // Navigate back to quotation builder with current data
    localStorage.setItem('quotationEdit', JSON.stringify(this.quotationData));
    this.router.navigate(['/quotations/create']);
  }

  saveAsDraft(): void {
    console.log('Saving as draft...');
    
    // TODO: Save to backend as draft
    // this.quotationService.saveAsDraft(this.quotationData)
    //   .subscribe(response => {
    //     console.log('Saved as draft');
    //     this.router.navigate(['/quotations']);
    //   });
    
    alert('Quotation saved as draft');
    this.router.navigate(['/quotations']);
  }

  sendQuotation(): void {
    console.log('Sending quotation...');
    
    // TODO: Update status to 'sent' and save to backend
    // const quotationToSend = {
    //   ...this.quotationData,
    //   status: 'sent',
    //   sentDate: new Date()
    // };
    // 
    // this.quotationService.sendQuotation(quotationToSend)
    //   .subscribe(response => {
    //     console.log('Quotation sent');
    //     this.showSuccessMessage('Quotation sent successfully!');
    //     this.router.navigate(['/quotations']);
    //   });
    
    alert('Quotation sent successfully!');
    this.router.navigate(['/quotations']);
  }

  close(): void {
    // Navigate back to quotations list
    this.router.navigate(['/quotations']);
  }
}