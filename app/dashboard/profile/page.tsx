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
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, MapPin, Phone, Code } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";

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

export default function ProfilePage() {
    const { user, updateUserPermissions } = useAuthStore();

    const profile = {
        name: user?.name || "John Doe",
        email: user?.email || "john.doe@example.com",
        address: "123 Main St, Anytown, USA",
        phone: "+1 (555) 123-4567",
    };

    const technologies = [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
    ];

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
                                    <BreadcrumbPage>Profile</BreadcrumbPage>
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
                                    <CardTitle>Profile Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-2">
                                    <div className="flex items-center gap-2">
                                            <User className="mr-2 h-4 w-4 text-primary" />
                                            <strong>Name:</strong>{" "}
                                            {profile.name}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="mr-2 h-4 w-4 text-primary" />
                                            <strong>Email:</strong>{" "}
                                            {profile.email}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                        <motion.div variants={item}>
                            <Card className="bg-card/50 backdrop-blur-md border-border">
                                <CardHeader>
                                    <CardTitle>Permissions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 space-x-2">
                                        <Switch
                                            id="job-management"
                                            checked={user?.canManageJobs}
                                            onCheckedChange={
                                                updateUserPermissions
                                            }
                                        />
                                        <Label htmlFor="job-management">
                                            Can Manage Jobs
                                        </Label>
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
