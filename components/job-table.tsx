"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/custom-card";
import {
    ChevronLeft,
    ChevronRight,
    Building2,
    MapPin,
    Calendar,
    DollarSign,
} from "lucide-react";
import { SignInModal } from "./sign-in-modal";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { Job } from "@/dto/dto";

type JobTableProps = {
    jobs: Job[];
};

export function JobTable({ jobs }: JobTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const { user } = useAuthStore();
    const itemsPerPage = 6;

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    const handleReadMore = (jobId: number) => {
        if (!user) {
            setIsSignInModalOpen(true);
        }
    };

    return (
        <div className="space-y-4">
            <Input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/60 backdrop-blur-sm"
            />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
                {paginatedJobs.map((job) => (
                    <Card key={job.id}>
                        <Card.Content className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {job.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Building2 className="h-4 w-4" />
                                            {job.company}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {job.datePosted}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center text-primary font-medium">
                                        <DollarSign className="h-4 w-4" />
                                        {job.salary}
                                    </div>
                                    <Link
                                        href={`/dashboard/jobs/${job.id}`}
                                        passHref
                                    >
                                        <Button
                                            variant="outline"
                                            className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90"
                                            onClick={() =>
                                                handleReadMore(job.id)
                                            }
                                        >
                                            Read More
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                {job.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {job.requirements
                                    .slice(0, 3)
                                    .map((req, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                                        >
                                            {req}
                                        </span>
                                    ))}
                                {job.requirements.length > 3 && (
                                    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                                        +{job.requirements.length - 3} more
                                    </span>
                                )}
                            </div>
                        </Card.Content>
                    </Card>
                ))}
            </div>
            <div className="flex items-center justify-between mt-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
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
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
            <SignInModal
                isOpen={isSignInModalOpen}
                onClose={() => setIsSignInModalOpen(false)}
            />
        </div>
    );
}
