export type CandidateStatus =
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  status: CandidateStatus;
  avatar?: string;
  appliedDate: Date;
  experience: string;
  location: string;
  skills: string[];
  resumeUrl?: string;
  nextInterview?: {
    date: Date;
    type: string;
  };
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  position: string;
  date: Date;
  duration: number; // in minutes
  type: "phone" | "video" | "onsite" | "technical";
  interviewers: string[];
  status: "scheduled" | "completed" | "cancelled";
}
