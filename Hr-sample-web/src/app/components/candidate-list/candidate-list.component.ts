import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { MatTableDataSource } from '@angular/material/table';
import { Candidate } from '../../models/candidate';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  dataSource: MatTableDataSource<Candidate> = new MatTableDataSource([]); // Initialize with empty array
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'position', 'status', 'actions'];
  isLoading = true; // Flag to control rendering

  constructor(private candidateService: CandidateService) {
    console.log('CandidateListComponent initialized');
    console.log('dataSource initialized:', this.dataSource);
    console.log('candidateService:', this.candidateService); // Debug service injection
    console.log('candidateService.getAll:', this.candidateService.getAll); // Debug getAll method
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
        this.dataSource.data = data || []; // Ensure data is always an array
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
        this.ngOnInit(); // Refresh the list
      },
      error => console.error('Error deleting candidate:', error)
    );
  }
}
