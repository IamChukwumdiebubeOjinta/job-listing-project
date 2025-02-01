"use client";

import { motion } from "framer-motion";
import { Bell, BriefcaseIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInModal } from "@/components/sign-in-modal";
import { useAuthStore } from "@/store/auth-store";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
};

export default function LandingPage() {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const { user } = useAuthStore();
    const router = useRouter();

    const handleCardClick = (path: string) => {
        if (!user) {
            setIsSignInModalOpen(true);
            return;
        }
        router.push(path);
    };

    return (
        <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[90svh]">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-w-4xl mx-auto"
            >
                <motion.div variants={item} className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        Find Your Dream Job
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Discover opportunities that match your skills and
                        aspirations
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    className="grid md:grid-cols-2 gap-8"
                >
                    <motion.div
                        variants={item}
                        className="group cursor-pointer"
                        onClick={() => handleCardClick("/dashboard/jobs")}
                    >
                        <div className="relative p-6 rounded-2xl backdrop-blur-md bg-card border border-border transition-all duration-300 hover:shadow-lg hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl" />
                            <Bell className="h-8 w-8 text-primary mb-4" />
                            <h3 className="text-xl font-bold mb-2">
                                Job Alerts
                            </h3>
                            <p className="text-muted-foreground">
                                Get notified about new opportunities matching
                                your profile
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="group cursor-pointer"
                        onClick={() =>
                            handleCardClick("/dashboard/manage-jobs")
                        }
                    >
                        <div className="relative p-6 rounded-2xl backdrop-blur-md bg-card border border-border transition-all duration-300 hover:shadow-lg hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl" />
                            <BriefcaseIcon className="h-8 w-8 text-primary mb-4" />
                            <h3 className="text-xl font-bold mb-2">
                                Manage Jobs
                            </h3>
                            <p className="text-muted-foreground">
                                Create and manage job listings for your
                                organization
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            <SignInModal
                isOpen={isSignInModalOpen}
                onClose={() => setIsSignInModalOpen(false)}
            />
        </div>
    );
}
