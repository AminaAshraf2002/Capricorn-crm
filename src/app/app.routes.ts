// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardHomeComponent } from './features/dashboard/dashboard-home/dashboard-home.component';
import { UserProfileComponent } from './features/profile/user-profile/user-profile.component';
import { AccountSettingsComponent } from './features/profile/account-settings/account-settings.component';

// Lead Management Imports
import { LeadsListComponent } from './features/leads/leads-list/leads-list.component';
import { LeadFormComponent } from './features/leads/lead-form/lead-form.component';
import { LeadDetailComponent } from './features/leads/lead-detail/lead-detail.component';
import { LeadAssignmentComponent } from './features/leads/lead-assignment/lead-assignment.component';
import { ImportLeadsComponent } from './features/leads/import-leads/import-leads.component';

// Communication Imports
import { ActivityLogComponent } from './features/communication/activity-log/activity-log.component';
import { TaskDashboardComponent } from './features/communication/task-dashboard/task-dashboard.component';

// Quotation Imports
import { QuotationListComponent } from './features/quotations/quotation-list/quotation-list.component';
import { QuotationBuilderComponent } from './features/quotations/quotation-builder/quotation-builder.component';
import { QuotationPreviewComponent } from './features/quotations/quotation-preview/quotation-preview.component';

// Deal Management Imports
import { DealPipelineComponent } from './features/deals/deal-pipeline/deal-pipeline.component';
import { DealFormComponent } from './features/deals/deal-form/deal-form.component';

// Project Management Imports
import { ProjectsListComponent } from './features/projects/projects-list/projects-list.component';
import { ProjectConversionComponent } from './features/projects/project-conversion/project-conversion.component';
import { ProjectTrackingComponent } from './features/projects/project-tracking/project-tracking.component';

// Report Management Imports 
import { ReportsDashboardComponent } from './features/reports/reports-dashboard/reports-dashboard.component';
import { CustomReportBuilderComponent } from './features/reports/custom-report-builder/custom-report-builder.component';
import { ExportReportsComponent } from './features/reports/export-reports/export-reports.component';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // Dashboard
      { path: 'dashboard', component: DashboardHomeComponent },
      
      // Profile & Settings
      { path: 'profile', component: UserProfileComponent },
      { path: 'settings', component: AccountSettingsComponent },
      
      // Lead Management Routes
      { path: 'leads', component: LeadsListComponent },
      { path: 'leads/add', component: LeadFormComponent },
      { path: 'leads/import', component: ImportLeadsComponent },
      { path: 'leads/assign', component: LeadAssignmentComponent },
      { path: 'leads/edit/:id', component: LeadFormComponent },
      { path: 'leads/:id', component: LeadDetailComponent },

      // Communication & Follow-up Routes
      { path: 'activities', component: ActivityLogComponent },
      { path: 'tasks', component: TaskDashboardComponent },
      
      // Quotation Management Routes
      { path: 'quotations', component: QuotationListComponent },
      { path: 'quotations/create', component: QuotationBuilderComponent },
      { path: 'quotations/edit/:id', component: QuotationBuilderComponent },
      { path: 'quotations/preview', component: QuotationPreviewComponent },
      { path: 'quotations/preview/:id', component: QuotationPreviewComponent },
      { path: 'quotations/:id', component: QuotationPreviewComponent },
      
      // Deal Management Routes
      { path: 'deals', component: DealPipelineComponent },
      { path: 'deals/create', component: DealFormComponent },
      { path: 'deals/edit/:id', component: DealFormComponent },
      { path: 'deals/:id', component: DashboardHomeComponent }, // TODO: Create Deal Detail View
      
      // Project Management Routes COMPLETE
      { path: 'projects', component: ProjectsListComponent },
      { path: 'projects/create', component: ProjectConversionComponent },
      { path: 'projects/edit/:id', component: ProjectConversionComponent },
      { path: 'projects/:id', component: ProjectTrackingComponent },
      
      // ✅ Reports Routes (Phase 6 - COMPLETE)
      { path: 'reports', component: ReportsDashboardComponent },
      { path: 'reports/custom', component: CustomReportBuilderComponent },
      { path: 'reports/export', component: ExportReportsComponent },

    ]
  }
];