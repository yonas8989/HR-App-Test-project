import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  dataSource = new MatTableDataSource<Company>();
  displayedColumns: string[] = ['id', 'name', 'location', 'actions'];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getAll().subscribe(companies => {
      this.dataSource.data = companies;
    });
  }

  delete(id: number) {
    this.companyService.delete(id).subscribe(() => {
      this.ngOnInit(); // Refresh the list
    });
  }
}
