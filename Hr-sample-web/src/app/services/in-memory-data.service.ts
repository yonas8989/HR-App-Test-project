import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Company } from '../models/company';
import { Department } from '../models/department';
import { Employee } from '../models/employee';
import { Salary } from '../models/salary';
import { Candidate } from '../models/candidate';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const companies: Company[] = [
      { id: 1, name: 'Tech Corp', location: 'New York', departments: [] },
      { id: 2, name: 'Innovate Inc', location: 'San Francisco', departments: [] }
    ];
    const departments: Department[] = [];
    const employees: Employee[] = [];
    const salaries: Salary[] = [];
    const candidates: Candidate[] = [];
    return { companies, departments, employees, salaries, candidates };
  }
}
