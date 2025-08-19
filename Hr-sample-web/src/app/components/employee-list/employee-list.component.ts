import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  animations: [
    trigger('tableFadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(10px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('500ms ease-in'))
    ])
  ]
})
export class EmployeeListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'companyName', 'departmentName', 'actions'];
  isLoading = true;

  constructor(private employeeService: EmployeeService) {
    console.log('EmployeeListComponent initialized');
    console.log('dataSource initialized:', this.dataSource);
    console.log('employeeService:', this.employeeService);
  }

  ngOnInit() {
    console.log('ngOnInit started');
    if (!this.employeeService || typeof this.employeeService.getEmployeesWithDetails !== 'function') {
      console.error('EmployeeService or getEmployeesWithDetails is undefined');
      this.dataSource.data = [];
      this.isLoading = false;
      return;
    }
    this.employeeService.getEmployeesWithDetails().subscribe(
      data => {
        console.log('Employee data loaded:', data);
        this.dataSource.data = data || [];
        this.isLoading = false;
        if (!data.length) {
          console.warn('No employees loaded in table');
        }
      },
      error => {
        console.error('Error loading employee data:', error);
        this.dataSource.data = [];
        this.isLoading = false;
      }
    );
  }

  delete(id: number) {
    console.log('Deleting employee ID:', id);
    this.employeeService.delete(id).subscribe(
      () => {
        console.log('Employee deleted:', id);
        this.ngOnInit(); // Refresh the list
      },
      error => console.error('Error deleting employee:', error)
    );
  }
}
