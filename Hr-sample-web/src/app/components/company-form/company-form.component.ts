import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEdit = true;
      this.companyService.getById(this.id).subscribe(company => {
        this.form.patchValue(company);
      });
    }
  }

  submit() {
    const company: Company = this.form.value;
    if (this.isEdit) {
      this.companyService.update(this.id, company).subscribe(() => {
        this.router.navigate(['/companies']);
      });
    } else {
      this.companyService.create(company).subscribe(() => {
        this.router.navigate(['/companies']);
      });
    }
  }
}
