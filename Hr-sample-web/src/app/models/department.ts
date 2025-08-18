export interface Department {
  id: number;
  name: string;
  companyId: number; // Foreign key to Company
  employees?: number[]; // Array of employee IDs (relationship)
}
