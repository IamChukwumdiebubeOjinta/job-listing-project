"use client";

import type React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthUser } from "@/mutations/auth-queries";
import Loading from "@/app/loading";
import { useAuthStore } from "@/store/auth-store";

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

// Provider wrapper with QueryClientProvider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthStateHandler>{children}</AuthStateHandler>
        </QueryClientProvider>
    );
};

// Internal component to handle auth state
const AuthStateHandler: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    useAuthUser();
    const isLoading = useAuthStore((state) => state.isLoading);

    if (isLoading) <Loading />;

    return <>{children}</>;
};
