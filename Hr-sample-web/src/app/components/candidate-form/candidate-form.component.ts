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
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEdit = true;
      if (typeof this.candidateService.getById !== 'function') {
        console.error('candidateService.getById is not a function');
        return;
      }
      this.candidateService.getById(this.id).subscribe(
        candidate => {
          if (candidate) {
            this.form.patchValue(candidate);
          } else {
            console.error('Candidate not found for ID:', this.id);
          }
        },
        error => console.error('Error fetching candidate for edit:', error)
      );
    }
  }

  submit() {
    if (this.form.invalid) {
      console.warn('Form is invalid');
      return;
    }
    const candidate: Candidate = this.form.value;
    console.log('Submitting candidate:', candidate);
    if (this.isEdit) {
      if (typeof this.candidateService.update !== 'function') {
        console.error('candidateService.update is not a function');
        return;
      }
      this.candidateService.update(this.id, candidate).subscribe(
        () => {
          console.log('Candidate updated successfully');
          this.router.navigate(['/candidates']);
        },
        error => console.error('Error updating candidate:', error)
      );
    } else {
      if (typeof this.candidateService.create !== 'function') {
        console.error('candidateService.create is not a function');
        return;
      }
      this.candidateService.create(candidate).subscribe(
        response => {
          console.log('Candidate created successfully:', response);
          this.router.navigate(['/candidates']);
        },
        error => console.error('Error creating candidate:', error)
      );
    }
  }
}
