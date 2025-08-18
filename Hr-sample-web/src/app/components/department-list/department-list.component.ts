import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'companyName', 'actions'];

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.departmentService.getDepartmentsWithCompanyNames().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  delete(id: number) {
    this.departmentService.delete(id).subscribe(() => {
      this.ngOnInit(); // Refresh the list
    });
  }
}
