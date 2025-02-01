"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { JobTable } from "@/components/job-table";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/ui/custom-breadcrumb";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { motion } from "framer-motion";
import { useJobListings } from "@/mutations/job";
import { useJobStore } from "@/store/job";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/custom-card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

export default function JobListingsPage() {
    const { data, isLoading, error } = useJobListings();
    const jobs = useJobStore((state) => state.jobs);
    const setJobs = useJobStore((state) => state.setJobs);
    const [experienceFilter, setExperienceFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [minSalaryFilter, setMinSalaryFilter] = useState("");


    // Filtering logic
    useEffect(() => {
        if (!data) return;

        let filteredJobs = [...data];

        if (experienceFilter && experienceFilter !== "all") {
            filteredJobs = filteredJobs.filter((job) =>
                job.experience
                    .toLowerCase()
                    .includes(experienceFilter.toLowerCase())
            );
        }

        if (locationFilter) {
            filteredJobs = filteredJobs.filter((job) =>
                job.location
                    .toLowerCase()
                    .includes(locationFilter.toLowerCase())
            );
        }

        if (minSalaryFilter) {
            filteredJobs = filteredJobs.filter((job) => {
                const minSalary =
                    Number.parseInt(
                        job.salary.split(" - ")[0]?.replace(/\D/g, "")
                    ) || 0;

                return minSalary >= Number.parseInt(minSalaryFilter);
            });
        }

        setJobs(filteredJobs);
    }, [data, experienceFilter, locationFilter, minSalaryFilter, setJobs]);

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
                            <Breadcrumb.List>
                                <Breadcrumb.Item>
                                    <Breadcrumb.Link href="/dashboard">
                                        Dashboard
                                    </Breadcrumb.Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.Page>
                                        Job Listings
                                    </Breadcrumb.Page>
                                </Breadcrumb.Item>
                            </Breadcrumb.List>
                        </Breadcrumb>
                    </header>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-1 flex-col gap-4 p-4"
                    >
                        <Card className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="experience-filter">
                                        Experience Level
                                    </Label>
                                    <Select
                                        value={experienceFilter}
                                        onValueChange={(value) => {
                                            setExperienceFilter(value);
                                            // handleFilterChange();
                                        }}
                                    >
                                        <SelectTrigger id="experience-filter">
                                            <SelectValue placeholder="Select experience level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All
                                            </SelectItem>
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
                                </div>
                                <div>
                                    <Label htmlFor="location-filter">
                                        Location
                                    </Label>
                                    <Input
                                        id="location-filter"
                                        placeholder="Filter by location"
                                        value={locationFilter}
                                        onChange={(e) => {
                                            setLocationFilter(e.target.value);
                                            // handleFilterChange();
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="salary-filter">
                                        Minimum Salary
                                    </Label>
                                    <Input
                                        id="salary-filter"
                                        type="number"
                                        placeholder="Minimum salary"
                                        value={minSalaryFilter}
                                        onChange={(e) => {
                                            setMinSalaryFilter(e.target.value);
                                            // handleFilterChange();
                                        }}
                                    />
                                </div>
                            </div>
                        </Card>
                        <JobTable jobs={jobs} />
                    </motion.div>
                </SidebarInset>
            </SidebarProvider>
        </ProtectedRoute>
    );
}
