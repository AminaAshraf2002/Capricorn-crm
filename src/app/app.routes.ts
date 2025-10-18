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
import { DealDetailComponent } from './features/deals/deal-detail/deal-detail.component';

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
      
      // ✅ Lead Management Routes (Correct Order)
      { path: 'leads', component: LeadsListComponent },
      { path: 'leads/add', component: LeadFormComponent },              // Specific route first
      { path: 'leads/import', component: ImportLeadsComponent },        // Specific route first
      { path: 'leads/assign', component: LeadAssignmentComponent },     // Specific route first
      { path: 'leads/edit/:id', component: LeadFormComponent },         // Dynamic route
      { path: 'leads/:id', component: LeadDetailComponent },            // Dynamic route last

      // Communication & Follow-up Routes
      { path: 'activities', component: ActivityLogComponent },
      { path: 'tasks', component: TaskDashboardComponent },
      
      // ✅ Quotation Management Routes (FIXED ORDER)
      { path: 'quotations', component: QuotationListComponent },
      { path: 'quotations/create', component: QuotationBuilderComponent },      // Specific first
      { path: 'quotations/preview', component: QuotationPreviewComponent },     // ✅ MOVED UP
      { path: 'quotations/edit/:id', component: QuotationBuilderComponent },    // Dynamic
      { path: 'quotations/preview/:id', component: QuotationPreviewComponent }, // Dynamic
      { path: 'quotations/:id', component: QuotationPreviewComponent },         // Catch-all last
      
      // ✅ Deal Management Routes (Correct Order)
      { path: 'deals', component: DealPipelineComponent },
      { path: 'deals/create', component: DealFormComponent },           // Specific first
      { path: 'deals/edit/:id', component: DealFormComponent },         // Dynamic
      { path: 'deals/:id', component: DealDetailComponent },            // Dynamic last
      
      // ✅ Project Management Routes (Correct Order)
      { path: 'projects', component: ProjectsListComponent },
      { path: 'projects/create', component: ProjectConversionComponent },   // Specific first
      { path: 'projects/edit/:id', component: ProjectConversionComponent }, // Dynamic
      { path: 'projects/:id', component: ProjectTrackingComponent },        // Dynamic last
      
      // ✅ Reports Routes (Correct Order)
      { path: 'reports', component: ReportsDashboardComponent },
      { path: 'reports/custom', component: CustomReportBuilderComponent },  // Specific first
      { path: 'reports/export', component: ExportReportsComponent },        // Specific first
    ]
  }
];