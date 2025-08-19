import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../models/candidate';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number;
  statuses = ['Applied', 'Interviewing', 'Hired', 'Rejected'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService
  ) {
    console.log('CandidateFormComponent initialized');
    console.log('candidateService:', this.candidateService); // Debug service injection
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      position: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null;
    if (this.id) {
      this.isEdit = true;
      this.candidateService.getById(this.id).subscribe(
        (candidate: Candidate) => {
          if (candidate) {
            this.form.patchValue({
              firstName: candidate.firstName,
              lastName: candidate.lastName,
              email: candidate.email,
              phone: candidate.phone,
              position: candidate.position,
              status: candidate.status
            });
          } else {
            console.error('Candidate not found for ID:', this.id);
          }
        },
        error => console.error('Error fetching candidate for edit:', error)
      );
    }
  }

  submit() {
    if (this.form.valid) {
      const candidate: Candidate = {
        id: this.isEdit ? this.id : 0,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        phone: this.form.value.phone,
        position: this.form.value.position,
        status: this.form.value.status
      };
      console.log('Submitting candidate:', candidate);

      const operation = this.isEdit
        ? this.candidateService.update(this.id, candidate)
        : this.candidateService.create(candidate);

      operation.subscribe(
        () => {
          console.log(this.isEdit ? 'Candidate updated' : 'Candidate created');
          this.router.navigate(['/candidates']);
        },
        error => console.error('Error saving candidate:', error)
      );
    } else {
      console.warn('Form is invalid');
    }
  }
}
