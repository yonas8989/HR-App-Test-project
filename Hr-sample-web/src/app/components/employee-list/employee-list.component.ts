import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'companyName', 'departmentName', 'actions'];

  constructor(private employeeService: EmployeeService) {
    console.log('EmployeeListComponent initialized'); // Debug log
  }

  ngOnInit() {
    this.employeeService.getEmployeesWithDetails().subscribe(
      data => {
        console.log('Employee data loaded:', data);
        this.dataSource.data = data;
        if (!data.length) {
          console.warn('No employees loaded in table');
        }
      },
      error => {
        console.error('Error loading employee data:', error);
      }
    );
  }

  delete(id: number) {
    this.employeeService.delete(id).subscribe(
      () => {
        console.log('Employee deleted:', id);
        this.ngOnInit(); // Refresh the list
      },
      error => console.error('Error deleting employee:', error)
    );
  }
}
