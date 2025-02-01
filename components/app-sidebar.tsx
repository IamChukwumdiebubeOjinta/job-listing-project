"use client";

import Link from "next/link";
import { Home, Briefcase, User, Settings, LogOut } from "lucide-react";
import { SearchForm } from "./search-form";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type React from "react"; // Import React
import { useAuthStore } from "@/store/auth-store";
import Loading from "@/app/loading";
import { useSignOut } from "@/mutations/auth-queries";

const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Briefcase, label: "Job Listings", href: "/dashboard/jobs" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
    { icon: Settings, label: "Manage Jobs", href: "/dashboard/manage-jobs" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useAuthStore();
    const { mutate: signOut } = useSignOut();
    const isLoading = useAuthStore((state) => state.isLoading);
    const router = useRouter();

    if (isLoading) <Loading />;

    const handleLogout = () => {
        signOut();
        router.push("/");
    };

    return (
        <Sidebar
            {...props}
            className="bg-card/50 backdrop-blur-md border-r border-border"
        >
            <SidebarHeader>
                <SearchForm className="px-4 py-2" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    // initial={{ opacity: 0, x: -20 }}
                                    // whileInView="visible"
                                    // animate={{ opacity: 1, x: 0 }}
                                    // transition={{ delay: index * 0.1 }}
                                >
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                href={item.href}
                                                className="flex items-center"
                                            >
                                                <item.icon className="mr-2 h-4 w-4" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </motion.div>
                            ))}
                            <motion.div
                                // initial={{ opacity: 0, x: -20 }}
                                // animate={{ opacity: 1, x: 0 }}
                                // transition={{ delay: menuItems.length * 0.1 }}
                            >
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={handleLogout}
                                        className="flex items-center text-destructive"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sign Out</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </motion.div>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
