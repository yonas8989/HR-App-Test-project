import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Salary } from '../models/salary';
import { Employee } from '../models/employee';
import { Company } from '../models/company';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private baseUrl = 'api/salaries';
  private employeesUrl = 'api/employees';
  private companiesUrl = 'api/companies';
  private departmentsUrl = 'api/departments';

  constructor(private http: HttpClient) {
    console.log('SalaryService initialized'); // Debug log
  }

  getAll(): Observable<Salary[]> {
    return this.http.get<Salary[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Error fetching salaries:', error);
        return of([]);
      })
    );
  }

  getById(id: number): Observable<Salary> {
    return this.http.get<Salary>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching salary ${id}:`, error);
        return of(null);
      })
    );
  }

  create(salary: Salary): Observable<Salary> {
    console.log('Creating salary:', salary); // Debug log
    return this.http.post<Salary>(this.baseUrl, salary).pipe(
      catchError(error => {
        console.error('Error creating salary:', error);
        return of(null);
      })
    );
  }

  update(id: number, salary: Salary): Observable<Salary> {
    console.log('Updating salary:', id, salary); // Debug log
    return this.http.put<Salary>(`${this.baseUrl}/${id}`, salary).pipe(
      catchError(error => {
        console.error(`Error updating salary ${id}:`, error);
        return of(null);
      })
    );
  }

  delete(id: number): Observable<void> {
    console.log('Deleting salary:', id); // Debug log
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting salary ${id}:`, error);
        return of(null);
      })
    );
  }

  getSalariesWithDetails(): Observable<any[]> {
    console.log('Fetching salaries with details...'); // Debug log
    return this.http.get<Salary[]>(this.baseUrl).pipe(
      mergeMap(salaries => {
        console.log('Salaries:', salaries);
        return this.http.get<Employee[]>(this.employeesUrl).pipe(
          mergeMap(employees => {
            console.log('Employees:', employees);
            return this.http.get<Company[]>(this.companiesUrl).pipe(
              mergeMap(companies => {
                console.log('Companies:', companies);
                return this.http.get<Department[]>(this.departmentsUrl).pipe(
                  map(departments => {
                    console.log('Departments:', departments);
                    return salaries.map(salary => {
                      const employee = employees.find(e => e.id === salary.employeeId);
                      const company = employee ? companies.find(c => c.id === employee.companyId) : null;
                      const department = employee ? departments.find(d => d.id === employee.departmentId) : null;
                      return {
                        ...salary,
                        employeeName: employee ? employee.firstName + ' ' + employee.lastName : 'Unknown',
                        companyName: company ? company.name : 'Unknown',
                        departmentName: department ? department.name : 'Unknown'
                      };
                    });
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
      }),
      catchError(error => {
        console.error('Error fetching salaries:', error);
        return of([]);
      })
    );
  }
}
