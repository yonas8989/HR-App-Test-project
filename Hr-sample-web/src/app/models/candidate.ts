export interface Candidate {
  id: number;
  name: string;
  skills: string;
  companyId?: number; // Optional foreign key to Company
}
