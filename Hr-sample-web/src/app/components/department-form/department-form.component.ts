import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { CompanyService } from '../../services/company.service';
import { Department } from '../../models/department';
import { Company } from '../../models/company';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number;
  companies$: Observable<Company[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private companyService: CompanyService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      companyId: ['', Validators.required]
    });
    this.companies$ = this.companyService.getAll();
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null;
    if (this.id) {
      this.isEdit = true;
      this.departmentService.getById(this.id).subscribe(
        (department: Department) => {
          if (department) {
            this.form.patchValue({
              name: department.name,
              companyId: department.companyId
            });
          } else {
            console.error('Department not found for ID:', this.id);
          }
        },
        error => console.error('Error fetching department for edit:', error)
      );
    }
  }

  submit() {
    if (this.form.valid) {
      const department: Department = {
        id: this.isEdit ? this.id : 0,
        name: this.form.value.name,
        companyId: this.form.value.companyId
      };
      console.log('Submitting department:', department);

      const operation = this.isEdit
        ? this.departmentService.update(this.id, department)
        : this.departmentService.create(department);

      operation.subscribe(
        () => {
          console.log(this.isEdit ? 'Department updated' : 'Department created');
          this.router.navigate(['/departments']);
        },
        error => console.error('Error saving department:', error)
      );
    } else {
      console.warn('Form is invalid');
    }
  }
}
