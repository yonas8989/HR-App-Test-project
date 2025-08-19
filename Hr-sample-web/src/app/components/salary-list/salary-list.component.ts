import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SalaryService } from '../../services/salary.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css'],
  animations: [
    trigger('tableFadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(10px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('500ms ease-in'))
    ])
  ]
})
export class SalaryListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'employeeName', 'amount', 'startDate', 'endDate', 'actions'];
  isLoading = true;

  constructor(private salaryService: SalaryService) {
    console.log('SalaryListComponent initialized');
    console.log('dataSource initialized:', this.dataSource);
    console.log('salaryService:', this.salaryService);
  }

  ngOnInit() {
    console.log('ngOnInit started');
    if (!this.salaryService || typeof this.salaryService.getSalariesWithDetails !== 'function') {
      console.error('SalaryService or getSalariesWithDetails is undefined');
      this.dataSource.data = [];
      this.isLoading = false;
      return;
    }
    this.salaryService.getSalariesWithDetails().subscribe(
      data => {
        console.log('Salary data loaded:', data);
        this.dataSource.data = data || [];
        this.isLoading = false;
        if (!data.length) {
          console.warn('No salaries loaded in table');
        }
      },
      error => {
        console.error('Error loading salary data:', error);
        this.dataSource.data = [];
        this.isLoading = false;
      }
    );
  }

  delete(id: number) {
    console.log('Deleting salary ID:', id);
    this.salaryService.delete(id).subscribe(
      () => {
        console.log('Salary deleted:', id);
        this.ngOnInit(); // Refresh the list
      },
      error => console.error('Error deleting salary:', error)
    );
  }
}
