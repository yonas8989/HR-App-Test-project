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
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null;
    if (this.id) {
      this.isEdit = true;
      this.employeeService.getById(this.id).subscribe(
        (employee: Employee) => {
          if (employee) {
            this.form.patchValue({
              firstName: employee.firstName,
              lastName: employee.lastName,
              email: employee.email,
              companyId: employee.companyId,
              departmentId: employee.departmentId
            });
          } else {
            console.error('Employee not found for ID:', this.id);
          }
        },
        error => console.error('Error fetching employee for edit:', error)
      );
    }
  }

  submit() {
    if (this.form.valid) {
      const employee: Employee = {
        id: this.isEdit ? this.id : 0,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        companyId: this.form.value.companyId,
        departmentId: this.form.value.departmentId
      };
      console.log('Submitting employee:', employee);

      const operation = this.isEdit
        ? this.employeeService.update(this.id, employee)
        : this.employeeService.create(employee);

      operation.subscribe(
        () => {
          console.log(this.isEdit ? 'Employee updated' : 'Employee created');
          this.router.navigate(['/employees']);
        },
        error => console.error('Error saving employee:', error)
      );
    } else {
      console.warn('Form is invalid');
    }
  }
}
