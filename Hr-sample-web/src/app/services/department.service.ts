import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Department } from '../models/department';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = 'api/departments';
  private companiesUrl = 'api/companies';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseUrl);
  }

  getById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.baseUrl}/${id}`);
  }

  create(department: Department): Observable<Department> {
    return this.http.post<Department>(this.baseUrl, department);
  }

  update(id: number, department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.baseUrl}/${id}`, department);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Get departments with their company names for display
  getDepartmentsWithCompanyNames(): Observable<any[]> {
    return this.http.get<Department[]>(this.baseUrl).pipe(
      mergeMap(departments =>
        this.http.get<Company[]>(this.companiesUrl).pipe(
          map(companies =>
            departments.map(department => {
              const company = companies.find(c => c.id === department.companyId);
              return {
                ...department,
                companyName: company ? company.name : 'Unknown'
              };
            })
          )
        )
      )
    );
  }
}
