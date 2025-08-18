export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  companyId: number; // Foreign key to Company
  departmentId: number; // Foreign key to Department
  salaries?: number[]; // Array of salary IDs (relationship)
}
