"use client";

import Loading from "@/app/loading";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type React from "react"; // Added import for React

type ProtectedRouteProps = {
    children: React.ReactNode;
    allowedRoles?: ("user" | "hr")[];
};

export function ProtectedRoute({
    children,
    allowedRoles,
}: ProtectedRouteProps) {
    const { user, isLoading } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/");
        }
        if (user && allowedRoles && !allowedRoles.includes(user.role)) {
            router.push("/dashboard");
        }
    }, [user, isLoading, router, allowedRoles]);

    if (isLoading) {
        return <Loading />;
    }

    if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
        return null;
    }

    return <>{children}</>;
}
