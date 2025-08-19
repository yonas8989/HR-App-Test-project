import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { DepartmentService } from '../../services/department.service';
import { Company } from '../../models/company';
import { Department } from '../../models/department';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number;
  departments: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private departmentService: DepartmentService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      departments: [[]] // Initialize as empty array
    });
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.isEdit = true;
      this.companyService.getById(this.id).subscribe(
        (company: Company) => {
          this.form.patchValue({
            name: company.name,
            location: company.location,
            departments: company.departments || [] // Ensure departments is an array
          });
        },
        error => console.error('Error loading company:', error)
      );
    }
    // Load departments for selection
    this.departmentService.getAll().subscribe(
      data => {
        this.departments = data;
        console.log('Departments loaded:', data);
      },
      error => console.error('Error loading departments:', error)
    );
  }

  submit() {
    if (this.form.valid) {
      const company: Company = {
        id: this.isEdit ? this.id : 0,
        name: this.form.value.name,
        location: this.form.value.location,
        departments: this.form.value.departments || [] // Ensure departments is an array
      };
      console.log('Submitting company:', company);

      const operation = this.isEdit
        ? this.companyService.update(this.id, company)
        : this.companyService.create(company);

      operation.subscribe(
        () => {
          console.log(this.isEdit ? 'Company updated' : 'Company created');
          this.router.navigate(['/companies']);
        },
        error => console.error('Error saving company:', error)
      );
    }
  }
}
