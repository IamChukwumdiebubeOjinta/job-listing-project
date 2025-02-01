"use client";

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
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, TrendingUp, SlidersHorizontal } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useJobListings } from "@/mutations/job";
import Link from "next/link";
import Loading from "../loading";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
};

export default function DashboardPage() {
    const { user } = useAuthStore();
    const { data, isLoading } = useJobListings();

    if (isLoading) <Loading />;
    
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
                                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="flex flex-1 flex-col gap-4 p-4"
                    >
                        <motion.div variants={item}>
                            <Card className="bg-card/50 backdrop-blur-md border-border">
                                <CardHeader>
                                    <CardTitle>
                                        Welcome to Your Job Listing Dashboard,{" "}
                                        {user?.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Here you can manage your job search,
                                        view listings, and update your profile.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                        <motion.div
                            variants={item}
                            className="grid grid-cols-2 gap-4"
                        >
                            <Card className="bg-card/50 backdrop-blur-md border-border">
                                <CardHeader>
                                    <CardTitle>Quick Stats</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        <div className="flex items-center w-full flex-row-reverse justify-between">
                                            <Briefcase className="mr-2 h-6 w-6 text-primary" />
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    Total Job Listings
                                                </h3>
                                                <p className="text-2xl font-bold">
                                                    {isLoading && "..."}
                                                    {data && data.length}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center w-full flex-row-reverse justify-between">
                                            <TrendingUp className="mr-2 h-6 w-6 text-primary" />
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    New Today
                                                </h3>
                                                <p className="text-2xl font-semibold">
                                                    coming soon...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/50 backdrop-blur-md border-border">
                                <CardHeader>
                                    <CardTitle>Manage Your Jobs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link
                                            href="/dashboard/manage-jobs"
                                            className="flex w-fit items-center bg-transparent hover:bg-primary/90 text-primary hover:text-primary-foreground px-0"
                                        >
                                            <p className="text-xl mr-2">
                                                Manage
                                            </p>
                                            <SlidersHorizontal className="h-5 w-5" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </SidebarInset>
            </SidebarProvider>
        </ProtectedRoute>
    );
}
