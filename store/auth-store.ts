import { create } from "zustand";
import { AuthStore } from "@/dto/dto";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isLoading: true,

            setUser: (user) => {
                set({ user });
            },

            setIsLoading: (isLoading: boolean) => {
                set({ isLoading });
            },

            updateUserPermissions: (canManageJobs: boolean) => {
                set((state) => ({
                    user: state.user
                        ? { ...state.user, canManageJobs }
                        : state.user,
                }));
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user
                    ? {
                          ...state.user,
                          canManageJobs: state.user.canManageJobs,
                      }
                    : null,
            }),
        }
    )
);
