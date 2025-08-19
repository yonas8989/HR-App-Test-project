import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
  animations: [
    trigger('tableFadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(10px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('500ms ease-in'))
    ])
  ]
})
export class DepartmentListComponent implements OnInit {
  dataSource: MatTableDataSource<Department> = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'name', 'companyId', 'employees', 'actions'];
  isLoading = true;

  constructor(private departmentService: DepartmentService) {
    console.log('DepartmentListComponent initialized');
    console.log('dataSource initialized:', this.dataSource);
    console.log('departmentService:', this.departmentService);
  }

  ngOnInit() {
    console.log('ngOnInit started');
    if (!this.departmentService || typeof this.departmentService.getAll !== 'function') {
      console.error('DepartmentService or getAll is undefined');
      this.dataSource.data = [];
      this.isLoading = false;
      return;
    }
    this.departmentService.getAll().subscribe(
      data => {
        console.log('Department data received:', data);
        this.dataSource.data = data || [];
        this.isLoading = false;
        if (!data || !data.length) {
          console.warn('No departments loaded in table');
        }
      },
      error => {
        console.error('Error loading department data:', error);
        this.dataSource.data = [];
        this.isLoading = false;
      }
    );
  }

  delete(id: number) {
    console.log('Deleting department ID:', id);
    this.departmentService.delete(id).subscribe(
      () => {
        console.log('Department deleted:', id);
        this.ngOnInit();
      },
      error => console.error('Error deleting department:', error)
    );
  }
}
