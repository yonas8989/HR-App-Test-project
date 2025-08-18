import { Component, OnInit } from '@angular/core';
import { SalaryService } from '../../services/salary.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]); // Initialize with empty array
  displayedColumns: string[] = ['id', 'employeeName', 'companyName', 'departmentName', 'amount', 'startDate', 'endDate', 'actions'];
  isLoading = true; // Flag to control rendering

  constructor(private salaryService: SalaryService) {
    console.log('SalaryListComponent initialized'); // Debug log
  }

  ngOnInit() {
    this.salaryService.getSalariesWithDetails().subscribe(
      data => {
        console.log('Salary data loaded:', data);
        this.dataSource.data = data || []; // Ensure data is always an array
        this.isLoading = false;
        if (!data || !data.length) {
          console.warn('No salaries loaded in table');
        }
      },
      error => {
        console.error('Error loading salary data:', error);
        this.dataSource.data = []; // Set empty array on error
        this.isLoading = false;
      }
    );
  }

  delete(id: number) {
    this.salaryService.delete(id).subscribe(
      () => {
        console.log('Salary deleted:', id);
        this.ngOnInit(); // Refresh the list
      },
      error => console.error('Error deleting salary:', error)
    );
  }
}
