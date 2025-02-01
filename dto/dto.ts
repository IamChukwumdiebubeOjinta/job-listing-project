export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  datePosted: string;
  salary: string;
  description: string;
  requirements: string[];
  type: string;
  experience: string;
}

export interface Params {
  params: { id: string };
}

export type User = {
    id: string;
    name: string;
    email: string;
    role: "user" | "hr";
    picture?: string;
    canManageJobs: boolean;
};

export type AuthStore = {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setIsLoading: (isLoading: boolean) => void;
    updateUserPermissions: (canManageJobs: boolean) => void;
};

export interface JobStore {
    jobs: Job[];
    setJobs: (jobs: Job[]) => void;
    addJob: (job: Job) => void;
    editJob: (updatedJob: Job) => void;
    deleteJob: (id: number) => void;
}
