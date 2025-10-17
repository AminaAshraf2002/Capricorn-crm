// src/app/features/communication/task-dashboard/task-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed';
  leadId?: string;
  leadName?: string;
  assignedTo: string;
  createdAt: Date;
}

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {
  taskForm!: FormGroup;
  showAddForm: boolean = false;
  filterStatus: 'all' | 'today' | 'upcoming' | 'overdue' | 'completed' = 'all';

  tasks: Task[] = [
    {
      id: '1',
      title: 'Follow-up call with John Smith',
      description: 'Discuss quotation and answer technical questions',
      dueDate: new Date('2024-10-10T15:00:00'),
      priority: 'high',
      status: 'pending',
      leadId: 'LD-2024-001',
      leadName: 'John Smith',
      assignedTo: 'Rajesh Kumar',
      createdAt: new Date('2024-10-08')
    },
    {
      id: '2',
      title: 'Send quotation to Sarah Johnson',
      description: 'Prepare and send detailed quotation for 5-floor elevator',
      dueDate: new Date('2024-10-10T17:00:00'),
      priority: 'medium',
      status: 'pending',
      leadId: 'LD-2024-002',
      leadName: 'Sarah Johnson',
      assignedTo: 'Rajesh Kumar',
      createdAt: new Date('2024-10-09')
    },
    {
      id: '3',
      title: 'Site visit at ABC Corporation',
      description: 'Conduct site survey and measurements',
      dueDate: new Date('2024-10-11T10:00:00'),
      priority: 'high',
      status: 'pending',
      leadId: 'LD-2024-003',
      leadName: 'Michael Brown',
      assignedTo: 'Amit Shah',
      createdAt: new Date('2024-10-08')
    },
    {
      id: '4',
      title: 'Email product brochure',
      description: 'Send elevator specifications and features brochure',
      dueDate: new Date('2024-10-09T12:00:00'),
      priority: 'low',
      status: 'completed',
      leadId: 'LD-2024-004',
      leadName: 'Emily Davis',
      assignedTo: 'Priya Sharma',
      createdAt: new Date('2024-10-07')
    },
    {
      id: '5',
      title: 'Schedule demo for David Wilson',
      description: 'Arrange product demonstration at showroom',
      dueDate: new Date('2024-10-12T14:00:00'),
      priority: 'medium',
      status: 'pending',
      leadId: 'LD-2024-005',
      leadName: 'David Wilson',
      assignedTo: 'Vikram Singh',
      createdAt: new Date('2024-10-09')
    },
    {
      id: '6',
      title: 'Prepare revised quotation',
      description: 'Update pricing based on customer requirements',
      dueDate: new Date('2024-10-08T16:00:00'),
      priority: 'high',
      status: 'pending',
      leadId: 'LD-2024-006',
      leadName: 'Jessica Martinez',
      assignedTo: 'Rajesh Kumar',
      createdAt: new Date('2024-10-06')
    }
  ];

  filteredTasks: Task[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.filterTasks();
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      dueTime: [''],
      priority: ['medium', Validators.required],
      leadId: ['']
    });
  }

  filterTasks(): void {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.filteredTasks = this.tasks.filter(task => {
      if (this.filterStatus === 'all') {
        return task.status === 'pending';
      } else if (this.filterStatus === 'today') {
        return task.status === 'pending' && 
               task.dueDate >= today && 
               task.dueDate < tomorrow;
      } else if (this.filterStatus === 'upcoming') {
        return task.status === 'pending' && task.dueDate >= tomorrow;
      } else if (this.filterStatus === 'overdue') {
        return task.status === 'pending' && task.dueDate < today;
      } else if (this.filterStatus === 'completed') {
        return task.status === 'completed';
      }
      return false;
    });

    // Sort by due date
    this.filteredTasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }

  setFilter(status: 'all' | 'today' | 'upcoming' | 'overdue' | 'completed'): void {
    this.filterStatus = status;
    this.filterTasks();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.taskForm.reset({ priority: 'medium' });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      
      // Combine date and time
      let dueDateTime = new Date(formData.dueDate);
      if (formData.dueTime) {
        const [hours, minutes] = formData.dueTime.split(':');
        dueDateTime.setHours(parseInt(hours), parseInt(minutes));
      }

      const newTask: Task = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        dueDate: dueDateTime,
        priority: formData.priority,
        status: 'pending',
        leadId: formData.leadId,
        assignedTo: 'Current User',
        createdAt: new Date()
      };

      this.tasks.unshift(newTask);
      this.filterTasks();
      this.toggleAddForm();
      
      alert('Task created successfully!');
    }
  }

  toggleTaskStatus(taskId: string): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = task.status === 'pending' ? 'completed' : 'pending';
      this.filterTasks();
    }
  }

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      this.filterTasks();
    }
  }

  editTask(taskId: string): void {
    console.log('Edit task:', taskId);
    // Implement edit functionality
  }

  viewLead(leadId: string): void {
    this.router.navigate(['/leads', leadId]);
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }

  isOverdue(task: Task): boolean {
    const now = new Date();
    return task.status === 'pending' && task.dueDate < now;
  }

  isDueToday(task: Task): boolean {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return task.dueDate >= today && task.dueDate < tomorrow;
  }

  formatDueDate(date: Date): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date < today) {
      const daysOverdue = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      return `${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue`;
    } else if (date >= today && date < tomorrow) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date >= tomorrow && date < new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)) {
      return `Tomorrow at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

  getTaskCounts() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      today: this.tasks.filter(t => 
        t.status === 'pending' && 
        t.dueDate >= today && 
        t.dueDate < tomorrow
      ).length,
      upcoming: this.tasks.filter(t => 
        t.status === 'pending' && 
        t.dueDate >= tomorrow
      ).length,
      overdue: this.tasks.filter(t => 
        t.status === 'pending' && 
        t.dueDate < today
      ).length,
      completed: this.tasks.filter(t => t.status === 'completed').length
    };
  }
}