import { JobStore } from "@/dto/dto";
import { create } from "zustand";

export const useJobStore = create<JobStore>((set) => ({
    jobs: [],
    setJobs: (jobs) => set({ jobs }),
    addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
    editJob: (updatedJob) =>
        set((state) => ({
            jobs: state.jobs.map((job) =>
                job.id === updatedJob.id ? updatedJob : job
            ),
        })),
    deleteJob: (id) =>
        set((state) => ({ jobs: state.jobs.filter((job) => job.id !== id) })),
}));
