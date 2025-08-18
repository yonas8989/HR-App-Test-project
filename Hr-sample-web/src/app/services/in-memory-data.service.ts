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
      { id: 1, name: 'Engineering', companyId: 1, employees: [1, 2] },
      { id: 2, name: 'HR', companyId: 1, employees: [3] },
      { id: 3, name: 'Marketing', companyId: 2, employees: [] }
    ];
    const employees: Employee[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@techcorp.com', companyId: 1, departmentId: 1, salaries: [1] },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@techcorp.com', companyId: 1, departmentId: 1, salaries: [2] },
      { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@techcorp.com', companyId: 1, departmentId: 2, salaries: [3] }
    ];
    const salaries: Salary[] = [
      { id: 1, employeeId: 1, amount: 50000, startDate: '2025-01-01', endDate: '2025-12-31' },
      { id: 2, employeeId: 2, amount: 60000, startDate: '2025-01-01' },
      { id: 3, employeeId: 3, amount: 45000, startDate: '2025-01-01' }
    ];
    const candidates: Candidate[] = [];
    return { companies, departments, employees, salaries, candidates };
  }
}
