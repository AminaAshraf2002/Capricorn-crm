import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  // General Settings
  settings = {
    companyName: 'Inspite Tech',
    companyEmail: 'info@inspitetech.com',
    companyPhone: '+91 8714158735',
    companyAddress: 'Infopark, Kochi, Kerala',
    website: 'www.inspitetech.com',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    language: 'English'
  };

  // Email Settings
  emailSettings = {
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: 'noreply@inspitetech.com',
    fromName: 'Capricorn CRM'
  };

  // Integration Settings
  integrations = {
    googleCalendar: false,
    googleDrive: false,
    slack: false,
    whatsapp: false,
    zapier: false
  };

  // Security Settings
  security = {
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5'
  };

  // Backup Settings
  backup = {
    autoBackup: true,
    backupFrequency: 'daily',
    backupTime: '02:00',
    retentionDays: '30'
  };

  // Active Section
  activeSection = 'general';

  selectSection(section: string) {
    this.activeSection = section;
  }

  saveGeneralSettings() {
    console.log('General Settings Saved:', this.settings);
    alert('General settings saved successfully!');
  }

  saveEmailSettings() {
    console.log('Email Settings Saved:', this.emailSettings);
    alert('Email settings saved successfully!');
  }

  testEmailConnection() {
    alert('Testing email connection...');
  }

  saveIntegrations() {
    console.log('Integrations Saved:', this.integrations);
    alert('Integration settings saved successfully!');
  }

  saveSecurity() {
    console.log('Security Saved:', this.security);
    alert('Security settings saved successfully!');
  }

  saveBackup() {
    console.log('Backup Settings Saved:', this.backup);
    alert('Backup settings saved successfully!');
  }

  performBackupNow() {
    alert('Backup started! This may take a few minutes...');
  }

  exportData() {
    alert('Exporting all data...');
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
      alert('Account deletion request submitted.');
    }
  }
}