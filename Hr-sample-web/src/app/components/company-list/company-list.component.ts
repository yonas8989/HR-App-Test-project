import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
  animations: [
    trigger('tableFadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(10px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('500ms ease-in'))
    ])
  ]
})
export class CompanyListComponent implements OnInit {
  dataSource: MatTableDataSource<Company> = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'name', 'location', 'departments', 'actions'];
  isLoading = true;

  constructor(private companyService: CompanyService) {
    console.log('CompanyListComponent initialized');
    console.log('dataSource initialized:', this.dataSource);
    console.log('companyService:', this.companyService);
  }

  ngOnInit() {
    console.log('ngOnInit started');
    if (!this.companyService || typeof this.companyService.getAll !== 'function') {
      console.error('CompanyService or getAll is undefined');
      this.dataSource.data = [];
      this.isLoading = false;
      return;
    }
    this.companyService.getAll().subscribe(
      data => {
        console.log('Company data received:', data);
        this.dataSource.data = data || [];
        this.isLoading = false;
        if (!data || !data.length) {
          console.warn('No companies loaded in table');
        }
      },
      error => {
        console.error('Error loading company data:', error);
        this.dataSource.data = [];
        this.isLoading = false;
      }
    );
  }

  delete(id: number) {
    console.log('Deleting company ID:', id);
    this.companyService.delete(id).subscribe(
      () => {
        console.log('Company deleted:', id);
        this.ngOnInit();
      },
      error => console.error('Error deleting company:', error)
    );
  }
}
