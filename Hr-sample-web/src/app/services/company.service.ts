import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'api/companies';

  constructor(private http: HttpClient) {
    console.log('CompanyService initialized');
  }

  getAll(): Observable<Company[]> {
    console.log('Fetching companies...');
    return this.http.get<Company[]>(this.baseUrl).pipe(
      map(companies => companies.map(company => ({
        ...company,
        departments: company.departments || [] // Ensure departments is an array
      }))),
      catchError(error => {
        console.error('Error fetching companies:', error);
        return of([]);
      })
    );
  }

  getById(id: number): Observable<Company> {
    console.log(`Fetching company ${id}...`);
    return this.http.get<Company>(`${this.baseUrl}/${id}`).pipe(
      map(company => ({
        ...company,
        departments: company.departments || [] // Ensure departments is an array
      })),
      catchError(error => {
        console.error(`Error fetching company ${id}:`, error);
        return of({ id: 0, name: '', location: '', departments: [] });
      })
    );
  }

  create(company: Company): Observable<Company> {
    console.log('Creating company:', company);
    return this.http.post<Company>(this.baseUrl, {
      ...company,
      departments: company.departments || []
    }).pipe(
      catchError(error => {
        console.error('Error creating company:', error);
        return of(null as any);
      })
    );
  }

  update(id: number, company: Company): Observable<Company> {
    console.log(`Updating company ${id}:`, company);
    return this.http.put<Company>(`${this.baseUrl}/${id}`, {
      ...company,
      departments: company.departments || []
    }).pipe(
      catchError(error => {
        console.error(`Error updating company ${id}:`, error);
        return of(null as any);
      })
    );
  }

  delete(id: number): Observable<void> {
    console.log('Deleting company:', id);
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting company ${id}:`, error);
        return of(null);
      })
    );
  }
}
