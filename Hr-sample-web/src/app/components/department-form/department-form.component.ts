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
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEdit = true;
      this.departmentService.getById(this.id).subscribe(department => {
        this.form.patchValue(department);
      });
    }
  }

  submit() {
    const department: Department = this.form.value;
    if (this.isEdit) {
      this.departmentService.update(this.id, department).subscribe(() => {
        this.router.navigate(['/departments']);
      });
    } else {
      this.departmentService.create(department).subscribe(() => {
        this.router.navigate(['/departments']);
      });
    }
  }
}
