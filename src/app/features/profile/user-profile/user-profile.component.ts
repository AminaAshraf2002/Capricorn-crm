import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  // User Data
  user = {
    fullName: 'John Doe',
    email: 'john@inspitetech.com',
    phone: '+91 8714158735',
    role: 'Sales Manager',
    department: 'Sales',
    location: 'Kochi, Kerala',
    bio: 'Experienced sales professional with 5+ years in CRM and customer relationship management.',
    profileImage: 'assets/images/logo1.png'
  };

  // Password Change
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  // Notification Settings
  notifications = {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    leadAssignments: true,
    dealUpdates: true,
    quotationApprovals: true
  };

  // Active Tab
  activeTab = 'profile';

  // Methods
  selectTab(tab: string) {
    this.activeTab = tab;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile() {
    console.log('Profile Updated:', this.user);
    alert('Profile updated successfully!');
  }

  changePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Password Changed');
    alert('Password changed successfully!');
    this.passwordData = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  updateNotifications() {
    console.log('Notifications Updated:', this.notifications);
    alert('Notification settings updated!');
  }
}