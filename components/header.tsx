"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SignInModal } from "./sign-in-modal";
import { useState } from "react";
import { motion } from "framer-motion";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * The `Header` component renders the header section of the application.
 * It includes the application title, theme toggle button, and user authentication controls.
 *
 * @returns {JSX.Element} The rendered header component.
 *
 * @remarks
 * - The header is fixed at the top of the page and has a backdrop blur effect.
 * - The theme toggle button allows switching between light and dark modes.
 * - If the user is authenticated, their avatar is displayed; otherwise, a "Sign In" button is shown.
 * - Clicking the application title redirects the user to the home page.
 * - A sign-in modal is displayed when the "Sign In" button is clicked.
 */
export function Header() {
    const { theme, setTheme } = useTheme();
    const { user } = useAuthStore();
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

    const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle);
    const isLoading = useAuthStore((state) => state.isLoading);
    const router = useRouter();

    const redirectHome = () => router.push("/");
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-background/30"
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    onClick={redirectHome}
                    className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text cursor-pointer text-transparent"
                >
                    Bube's Listings
                </motion.div>
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                        }
                    >
                        {theme === "light" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                {user ? (
                                    <Avatar>
                                        <AvatarImage src={user.picture} />
                                        <AvatarFallback>
                                            {user.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            setIsSignInModalOpen(true)
                                        }
                                    >
                                        Sign In
                                    </Button>
                                )}
                            </TooltipTrigger>
                            <TooltipContent>
                                {user ? `${user.name}` : "Sign In"}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <SignInModal
                isOpen={isSignInModalOpen}
                onClose={() => setIsSignInModalOpen(false)}
            />
        </motion.header>
    );
}
