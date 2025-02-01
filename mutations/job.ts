import { Job } from "@/dto/dto";
import { useJobStore } from "@/store/job";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useJobListings = () => {
    const setJobs = useJobStore((state) => state.setJobs);
    return useQuery<Job[]>({
        queryKey: ["jobs"],
        queryFn: async () => {
            const res = await fetch("/api/jobs");
            if (!res.ok) throw new Error("Failed to fetch jobs");
            const data = await res.json();
            setJobs(data);
            return data;
        },
    });
};

export const useAddJob = () => {
    const queryClient = useQueryClient();
    const addJob = useJobStore((state) => state.addJob);
    return useMutation({
        mutationFn: async (newJob: Omit<Job, "id">) => {
            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newJob),
            });
            if (!res.ok) throw new Error("Failed to add job");
            return res.json();
        },
        onSuccess: (data) => {
            addJob(data);
            queryClient.invalidateQueries(["jobs"]);
        },
    });
};

export const useDeleteJob = () => {
    const queryClient = useQueryClient();
    const deleteJob = useJobStore((state) => state.deleteJob);
    return useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete job");
            return res.json();
        },
        onSuccess: (_, id) => {
            deleteJob(id);
            queryClient.invalidateQueries(["jobs"]);
        },
    });
};

export const useEditJob = () => {
    const queryClient = useQueryClient();
    const editJob = useJobStore((state) => state.editJob);
    return useMutation({
        mutationFn: async (updatedJob: Job) => {
            const res = await fetch(`/api/jobs/${updatedJob.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedJob),
            });
            if (!res.ok) throw new Error("Failed to update job");
            return res.json();
        },
        onSuccess: (data) => {
            editJob(data);
            queryClient.invalidateQueries(["jobs"]);
        },
    });
};
