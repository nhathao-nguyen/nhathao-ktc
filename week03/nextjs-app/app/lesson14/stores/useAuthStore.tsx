import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  username: string;
  email?: string;
  role: "admin" | "user" | "moderator";
  permissions?: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hydrated: boolean;
}

interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  isAdmin: () => boolean;
  hasPermission: (permission: string) => boolean;
  initializeAuth: () => void;
  forceClearAuth: () => void;
  waitForHydration: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      hydrated: false,

      // Actions
      login: (user: User, token: string) => {
        if (!user || !user.role || !token) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: 'Invalid login response',
          });
          if (typeof window !== "undefined") {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
          }
          return;
        }
        set({
          user,
          token,
          isAuthenticated: true,
          error: null,
        });
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", token);
          localStorage.setItem("user", JSON.stringify(user));
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
        }
      },

      // Debug: force clear all auth state and localStorage
      forceClearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        if (typeof window !== "undefined") {
          localStorage.clear();
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === "admin";
      },

      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user) return false;
        if (user.role === "admin") return true;
        return user.permissions?.includes(permission) || false;
      },

      initializeAuth: () => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("access_token");
          const userStr = localStorage.getItem("user");
          let user: User | null = null;
          try {
            user = userStr ? JSON.parse(userStr) : null;
          } catch {
            user = null;
          }
          if (token && token !== "undefined" && token !== "" && user && user.role) {
            set({
              token,
              isAuthenticated: true,
              user,
              hydrated: true,
            });
          } else {
            set({
              token: null,
              isAuthenticated: false,
              user: null,
              hydrated: true,
            });
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
          }
        } else {
          set({ hydrated: true });
        }
      },

      waitForHydration: () => {
        return new Promise((resolve) => {
          const check = () => {
            if (get().hydrated) resolve();
            else setTimeout(check, 10);
          };
          check();
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.initializeAuth();
      },
    }
  )
);
