import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Company } from '../models/company';
import { Department } from '../models/department';
import { Employee } from '../models/employee';
import { Salary } from '../models/salary';
import { Candidate } from '../models/candidate';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const companies: Company[] = [
      { id: 1, name: 'Tech Corp', location: 'New York', departments: [1, 2] },
      { id: 2, name: 'Innovate Inc', location: 'San Francisco', departments: [3] }
    ];
    const departments: Department[] = [
      { id: 1, name: 'Engineering', companyId: 1, employees: [] },
      { id: 2, name: 'HR', companyId: 1, employees: [] },
      { id: 3, name: 'Marketing', companyId: 2, employees: [] }
    ];
    const employees: Employee[] = [];
    const salaries: Salary[] = [];
    const candidates: Candidate[] = [];
    return { companies, departments, employees, salaries, candidates };
  }
}
