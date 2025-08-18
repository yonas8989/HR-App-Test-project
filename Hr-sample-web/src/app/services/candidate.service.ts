import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private baseUrl = 'api/candidates';

  constructor(private http: HttpClient) {
    console.log('CandidateService initialized'); // Debug log
  }

  getAll(): Observable<Candidate[]> {
    console.log('Fetching candidates...'); // Debug log
    return this.http.get<Candidate[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Error fetching candidates:', error);
        return of([]);
      })
    );
  }

  getById(id: number): Observable<Candidate> {
    console.log('Fetching candidate ID:', id); // Debug log
    return this.http.get<Candidate>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching candidate ${id}:`, error);
        return of(null);
      })
    );
  }

  create(candidate: Candidate): Observable<Candidate> {
    console.log('Creating candidate:', candidate); // Debug log
    return this.http.post<Candidate>(this.baseUrl, candidate).pipe(
      catchError(error => {
        console.error('Error creating candidate:', error);
        return of(null);
      })
    );
  }

  update(id: number, candidate: Candidate): Observable<Candidate> {
    console.log('Updating candidate:', id, candidate); // Debug log
    return this.http.put<Candidate>(`${this.baseUrl}/${id}`, candidate).pipe(
      catchError(error => {
        console.error(`Error updating candidate ${id}:`, error);
        return of(null);
      })
    );
  }

  delete(id: number): Observable<void> {
    console.log('Deleting candidate:', id); // Debug log
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting candidate ${id}:`, error);
        return of(null);
      })
    );
  }
}
