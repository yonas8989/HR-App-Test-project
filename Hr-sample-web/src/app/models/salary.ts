export interface Salary {
  id: number;
  employeeId: number; // Foreign key to Employee
  amount: number;
  currency: string;
}
