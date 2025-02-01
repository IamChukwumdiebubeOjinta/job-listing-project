import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onIdTokenChanged,
    type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase-config";
import { useAuthStore } from "@/store/auth-store";

const googleProvider = new GoogleAuthProvider();

const mapFirebaseUser = (firebaseUser: FirebaseUser | null): User | null => {
    if (!firebaseUser) return null;

    return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "Anonymous",
        email: firebaseUser.email || "",
        role: firebaseUser.email?.includes("hr") ? "hr" : "user",
        picture: firebaseUser.photoURL || undefined,
        canManageJobs: false,
    };
};

// Query for current user
export const useAuthUser = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);
    const setIsLoading = useAuthStore((state) => state.setIsLoading);

    return useQuery({
        queryKey: ["auth-user"],
        queryFn: () => {
            return new Promise((resolve) => {
                setIsLoading(true);
                const unsubscribe = onIdTokenChanged(auth, (firebaseUser) => {
                    const user = mapFirebaseUser(firebaseUser);
                    setUser(user);
                    setIsLoading(false);
                    resolve(user);
                    unsubscribe();
                });
            });
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        onError: () => {
            setIsLoading(false);
        },
    });
};

// Mutation for Google Sign In
export const useGoogleSignIn = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);
    const setIsLoading = useAuthStore((state) => state.setIsLoading);

    return useMutation({
        mutationFn: async () => {
            setIsLoading(true);
            try {
                const result = await signInWithPopup(auth, googleProvider);
                return mapFirebaseUser(result.user);
            } catch (error) {
                setIsLoading(false);
                throw error;
            }
        },
        onSuccess: (user) => {
            queryClient.setQueryData(["auth-user"], user);
            setUser(user);
            setIsLoading(false);
        },
        onError: () => {
            setIsLoading(false);
        },
    });
};

// Mutation for Sign Out
export const useSignOut = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);
    const setIsLoading = useAuthStore((state) => state.setIsLoading);

    return useMutation({
        mutationFn: async () => {
            setIsLoading(true);
            try {
                await signOut(auth);
                return null;
            } catch (error) {
                setIsLoading(false);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.setQueryData(["auth-user"], null);
            setUser(null);
            setIsLoading(false);
        },
        onError: () => {
            setIsLoading(false);
        },
    });
};
