export interface Company {
  id: number;
  name: string;
  location: string;
  departments?: number[]; // Array of department IDs (relationship)
}
