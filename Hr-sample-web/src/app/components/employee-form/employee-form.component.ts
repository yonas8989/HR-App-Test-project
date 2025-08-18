import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CompanyService } from '../../services/company.service';
import { DepartmentService } from '../../services/department.service';
import { Employee } from '../../models/employee';
import { Company } from '../../models/company';
import { Department } from '../../models/department';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number;
  companies$: Observable<Company[]>;
  departments$: Observable<Department[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private departmentService: DepartmentService
  ) {
    console.log('EmployeeFormComponent initialized'); // Debug log
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      companyId: ['', Validators.required],
      departmentId: ['', Validators.required]
    });
    this.companies$ = this.companyService.getAll();
    this.departments$ = this.departmentService.getAll();
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEdit = true;
      this.employeeService.getById(this.id).subscribe(employee => {
        if (employee) {
          this.form.patchValue(employee);
        } else {
          console.error('Employee not found for ID:', this.id);
        }
      }, error => {
        console.error('Error fetching employee for edit:', error);
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      console.warn('Form is invalid');
      return;
    }
    const employee: Employee = this.form.value;
    console.log('Submitting employee:', employee); // Debug log
    if (this.isEdit) {
      this.employeeService.update(this.id, employee).subscribe(
        () => {
          console.log('Employee updated successfully');
          this.router.navigate(['/employees']);
        },
        error => console.error('Error updating employee:', error)
      );
    } else {
      if (typeof this.employeeService.create !== 'function') {
        console.error('employeeService.create is not a function');
        return;
      }
      this.employeeService.create(employee).subscribe(
        (response) => {
          console.log('Employee created successfully:', response);
          this.router.navigate(['/employees']);
        },
        error => console.error('Error creating employee:', error)
      );
    }
  }
}
