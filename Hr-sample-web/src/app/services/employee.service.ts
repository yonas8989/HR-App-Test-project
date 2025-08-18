import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Employee } from '../models/employee';
import { Company } from '../models/company';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'api/employees';
  private companiesUrl = 'api/companies';
  private departmentsUrl = 'api/departments';

  constructor(private http: HttpClient) {
    console.log('EmployeeService initialized'); // Debug log
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Error fetching employees:', error);
        return of([]);
      })
    );
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching employee ${id}:`, error);
        return of(null);
      })
    );
  }

  create(employee: Employee): Observable<Employee> {
    console.log('Creating employee:', employee); // Debug log
    return this.http.post<Employee>(this.baseUrl, employee).pipe(
      catchError(error => {
        console.error('Error creating employee:', error);
        return of(null);
      })
    );
  }

  update(id: number, employee: Employee): Observable<Employee> {
    console.log('Updating employee:', id, employee); // Debug log
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee).pipe(
      catchError(error => {
        console.error(`Error updating employee ${id}:`, error);
        return of(null);
      })
    );
  }

  delete(id: number): Observable<void> {
    console.log('Deleting employee:', id); // Debug log
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting employee ${id}:`, error);
        return of(null);
      })
    );
  }

  getEmployeesWithDetails(): Observable<any[]> {
    console.log('Fetching employees with details...'); // Debug log
    return this.http.get<Employee[]>(this.baseUrl).pipe(
      mergeMap(employees => {
        console.log('Employees:', employees);
        return this.http.get<Company[]>(this.companiesUrl).pipe(
          mergeMap(companies => {
            console.log('Companies:', companies);
            return this.http.get<Department[]>(this.departmentsUrl).pipe(
              map(departments => {
                console.log('Departments:', departments);
                return employees.map(employee => ({
                  ...employee,
                  companyName: companies.find(c => c.id === employee.companyId) ?
                               companies.find(c => c.id === employee.companyId).name : 'Unknown',
                  departmentName: departments.find(d => d.id === employee.departmentId) ?
                                  departments.find(d => d.id === employee.departmentId).name : 'Unknown'
                }));
              }),
              catchError(error => {
                console.error('Error fetching departments:', error);
                return of([]);
              })
            );
          }),
          catchError(error => {
            console.error('Error fetching companies:', error);
            return of([]);
          })
        );
      }),
      catchError(error => {
        console.error('Error fetching employees:', error);
        return of([]);
      })
    );
  }
}
