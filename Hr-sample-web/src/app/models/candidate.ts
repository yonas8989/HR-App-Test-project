export interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  status: string; // e.g., 'Applied', 'Interviewing', 'Hired', 'Rejected'
}
