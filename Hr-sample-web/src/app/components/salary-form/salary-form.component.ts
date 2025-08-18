import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryService } from '../../services/salary.service';
import { EmployeeService } from '../../services/employee.service';
import { Salary } from '../../models/salary';
import { Employee } from '../../models/employee';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-salary-form',
  templateUrl: './salary-form.component.html',
  styleUrls: ['./salary-form.component.css']
})
export class SalaryFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number;
  employees$: Observable<Employee[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private salaryService: SalaryService,
    private employeeService: EmployeeService
  ) {
    console.log('SalaryFormComponent initialized');
    this.form = this.fb.group({
      employeeId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      startDate: ['', Validators.required],
      endDate: ['']
    });
    this.employees$ = this.employeeService.getAll();
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEdit = true;
      this.salaryService.getById(this.id).subscribe(salary => {
        if (salary) {
          this.form.patchValue({
            ...salary,
            startDate: salary.startDate.split('T')[0],
            endDate: salary.endDate ? salary.endDate.split('T')[0] : ''
          });
        } else {
          console.error('Salary not found for ID:', this.id);
        }
      }, error => {
        console.error('Error fetching salary for edit:', error);
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      console.warn('Form is invalid');
      return;
    }
    const salary: Salary = this.form.value;
    console.log('Submitting salary:', salary);
    if (this.isEdit) {
      this.salaryService.update(this.id, salary).subscribe(
        () => {
          console.log('Salary updated successfully');
          this.router.navigate(['/salaries']);
        },
        error => console.error('Error updating salary:', error)
      );
    } else {
      if (typeof this.salaryService.create !== 'function') {
        console.error('salaryService.create is not a function');
        return;
      }
      this.salaryService.create(salary).subscribe(
        response => {
          console.log('Salary created successfully:', response);
          this.router.navigate(['/salaries']);
        },
        error => console.error('Error creating salary:', error)
      );
    }
  }
}
