"use client";

import { notFound, useParams } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/ui/custom-breadcrumb";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/custom-card";
import {
    Building2,
    MapPin,
    Calendar,
    DollarSign,
    Briefcase,
    Clock,
} from "lucide-react";
import Loading from "@/app/loading";
import { useJobListings } from "@/mutations/job";

export default function JobDetailPage() {
    const params = useParams();
    const jobId = Number.parseInt(params.id as string, 10);
    const { data, isLoading } = useJobListings();
    if (typeof data === "undefined") return null;
    const job = data && data.find((j) => j.id === jobId);

    if (isLoading) <Loading />;

    if (!job) notFound();

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
                                    <Breadcrumb.Link href="/dashboard/jobs">
                                        Job Listings
                                    </Breadcrumb.Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.Page>
                                        {job.title}
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
                        <Card>
                            <Card.Header>
                                <Card.Title className="text-2xl">
                                    {job.title}
                                </Card.Title>
                                <Card.Description>
                                    <div className="flex items-center gap-4 text-muted-foreground mt-2">
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
                                </Card.Description>
                            </Card.Header>
                            <Card.Content>
                                <div className="grid gap-4">
                                    <div className="flex items-center text-primary font-medium">
                                        <DollarSign className="h-5 w-5 mr-2" />
                                        Salary: {job.salary}
                                    </div>
                                    <div className="flex items-center text-muted-foreground">
                                        <Briefcase className="h-5 w-5 mr-2" />
                                        Job Type: {job.type}
                                    </div>
                                    <div className="flex items-center text-muted-foreground">
                                        <Clock className="h-5 w-5 mr-2" />
                                        Experience: {job.experience}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            Job Description
                                        </h3>
                                        <p>{job.description}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            Requirements
                                        </h3>
                                        <ul className="list-disc pl-5">
                                            {job.requirements.map(
                                                (req, index) => (
                                                    <li key={index}>{req}</li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                    </motion.div>
                </SidebarInset>
            </SidebarProvider>
        </ProtectedRoute>
    );
}
