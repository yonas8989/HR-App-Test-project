export interface Employee {
  id: number;
  name: string;
  position: string;
  departmentId: number; // Foreign key to Department
  salaryId?: number; // Foreign key to Salary (one-to-one)
}
