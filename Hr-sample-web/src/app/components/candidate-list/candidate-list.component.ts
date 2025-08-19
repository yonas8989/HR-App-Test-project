import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../models/candidate';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
  animations: [
    trigger('tableFadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(10px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('500ms ease-in'))
    ])
  ]
})
export class CandidateListComponent implements OnInit {
  dataSource: MatTableDataSource<Candidate> = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'position', 'status', 'actions'];
  isLoading = true;

  constructor(private candidateService: CandidateService) {
    console.log('CandidateListComponent initialized');
    console.log('dataSource initialized:', this.dataSource);
    console.log('candidateService:', this.candidateService);
  }

  ngOnInit() {
    console.log('ngOnInit started');
    if (!this.candidateService || typeof this.candidateService.getAll !== 'function') {
      console.error('CandidateService or getAll is undefined');
      this.dataSource.data = [];
      this.isLoading = false;
      return;
    }
    this.candidateService.getAll().subscribe(
      data => {
        console.log('Candidate data received:', data);
        this.dataSource.data = data || [];
        this.isLoading = false;
        if (!data || !data.length) {
          console.warn('No candidates loaded in table');
        }
      },
      error => {
        console.error('Error loading candidate data:', error);
        this.dataSource.data = [];
        this.isLoading = false;
      }
    );
  }

  delete(id: number) {
    console.log('Deleting candidate ID:', id);
    this.candidateService.delete(id).subscribe(
      () => {
        console.log('Candidate deleted:', id);
        this.ngOnInit();
      },
      error => console.error('Error deleting candidate:', error)
    );
  }
}
