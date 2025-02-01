"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import {
    useAddJob,
    useDeleteJob,
    useEditJob,
    useJobListings,
} from "@/mutations/job";
import { useJobStore } from "@/store/job";
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectContent,
} from "@/components/ui/select";

type Job = {
    id: number;
    title: string;
    company: string;
    location: string;
    datePosted: string;
};

export default function ManageJobsPage() {
    const { data, isLoading, error } = useJobListings();
    const jobs = useJobStore((state) => state.jobs);
    const setJobs = useJobStore((state) => state.setJobs);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const { user, updateUserPermissions } = useAuthStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [addJobIndicator, setAddJobIndicator] = useState(false);
    const { mutate: addJob } = useAddJob();
    const { mutate: editJob } = useEditJob();
    const { mutate: deleteJob } = useDeleteJob();

    const itemsPerPage = 4;

    const paginatedJobs = jobs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(jobs.length / itemsPerPage);

    const handleAddJob = () => {
        const newJob: Job = {
            id: jobs.length + 1,
            title: "New Job",
            company: "Company Name",
            location: "Location",
            datePosted: new Date().toISOString().split("T")[0],
            salary: "",
            description: "",
            requirements: [],
            type: "Full-time",
            experience: "Entry-level",
        };
        setJobs([...jobs, newJob]);
        setAddJobIndicator((prev) => !prev);
        setEditingJob(newJob);
    };

    const handleEditJob = (job: Job) => {
        setAddJobIndicator((prev) => !prev);
        setEditingJob(job);
    };

    const handleDeleteJob = (id: number) => {
        deleteJob(id);
        if (editingJob?.id === id) {
            setEditingJob(null);
        }
    };

    const handleSaveJob = (updatedJob: Job) => {
        if (addJobIndicator) {
            addJob(updatedJob);
        } else {
            editJob(updatedJob);
        }
        setEditingJob(null);
    };

    const handleTogglePermission = () => {
        updateUserPermissions(!user?.canManageJobs);
    };

    if (!user?.canManageJobs) {
        return (
            <ProtectedRoute>
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset className="bg-background/60 backdrop-blur-sm">
                        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 bg-card/50 backdrop-blur-md">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/dashboard">
                                            Dashboard
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            Manage Jobs
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </header>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-1 flex-col items-center justify-center p-4"
                        >
                            <Card className="p-6 bg-card/50 backdrop-blur-md border-border text-center">
                                <h2 className="text-2xl font-bold mb-4">
                                    Permission Required
                                </h2>
                                <p className="mb-4">
                                    You don't have permission to manage jobs.
                                    Would you like to request access?
                                </p>
                                <Button onClick={handleTogglePermission}>
                                    Request Job Management Access
                                </Button>
                            </Card>
                        </motion.div>
                    </SidebarInset>
                </SidebarProvider>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="bg-background/60 backdrop-blur-sm">
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 bg-card/50 backdrop-blur-md">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Manage Jobs</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-1 flex-col gap-4 p-4"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Manage Jobs</h2>
                            <Button onClick={handleAddJob}>
                                <Plus className="mr-2 h-4 w-4" /> Add Job
                            </Button>
                        </div>
                        <Card className="bg-card/50 backdrop-blur-md border-border p-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Experience Level</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedJobs.map((job) => (
                                        <TableRow key={job.id}>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.company}</TableCell>
                                            <TableCell>
                                                {job.location}
                                            </TableCell>
                                            <TableCell>
                                                {job.experience}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleEditJob(job)
                                                    }
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDeleteJob(job.id)
                                                    }
                                                >
                                                    <Trash className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                        {editingJob && (
                            <Card className="bg-card/50 backdrop-blur-md border-border p-4 mt-4">
                                <h3 className="text-xl font-bold mb-4">
                                    {!addJobIndicator ? "Edit Job" : "Add Job"}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Job Title"
                                        value={editingJob.title}
                                        onChange={(e) =>
                                            setEditingJob({
                                                ...editingJob,
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        placeholder="Company"
                                        value={editingJob.company}
                                        onChange={(e) =>
                                            setEditingJob({
                                                ...editingJob,
                                                company: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        placeholder="Location"
                                        value={editingJob.location}
                                        onChange={(e) =>
                                            setEditingJob({
                                                ...editingJob,
                                                location: e.target.value,
                                            })
                                        }
                                    />

                                    <Input
                                        placeholder="Salary (e.g., 120K - 160K)"
                                        value={editingJob.salary}
                                        onChange={(e) =>
                                            setEditingJob({
                                                ...editingJob,
                                                salary: e.target.value,
                                            })
                                        }
                                    />
                                    <Select
                                        value={editingJob.experience}
                                        onValueChange={(value) =>
                                            setEditingJob({
                                                ...editingJob,
                                                experience: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select experience level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Entry-level">
                                                Entry-level
                                            </SelectItem>
                                            <SelectItem value="Mid-level">
                                                Mid-level
                                            </SelectItem>
                                            <SelectItem value="Senior">
                                                Senior
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        value={editingJob.type}
                                        onValueChange={(value) =>
                                            setEditingJob({
                                                ...editingJob,
                                                type: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Full-time">
                                                Full-time
                                            </SelectItem>
                                            <SelectItem value="Part-time">
                                                Part-time
                                            </SelectItem>
                                            <SelectItem value="Contract">
                                                Contract
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        className="col-span-2"
                                        placeholder="Description"
                                        value={editingJob.description}
                                        onChange={(e) =>
                                            setEditingJob({
                                                ...editingJob,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        className="col-span-2"
                                        placeholder="Requirements (comma-separated)"
                                        value={editingJob.requirements.join(
                                            ", "
                                        )}
                                        onChange={(e) =>
                                            setEditingJob({
                                                ...editingJob,
                                                requirements:
                                                    e.target.value.split(", "),
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Button
                                        onClick={() => setEditingJob(null)}
                                        variant="outline"
                                        className="mr-2"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleSaveJob(editingJob)
                                        }
                                    >
                                        Save
                                    </Button>
                                </div>
                            </Card>
                        )}
                        <div className="flex items-center justify-between mt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4 mr-2" />
                                Previous
                            </Button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                </SidebarInset>
            </SidebarProvider>
        </ProtectedRoute>
    );
}
