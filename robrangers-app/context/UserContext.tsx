"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  xp: number;
  level: number;
  githubConnected: boolean;
  githubUsername: string;
  completedQuizzes: number[];
  completedChallenges: number[];
  learningHistory: Array<{
    title: string;
    date: string;
    status: string;
  }>;
  createdAt: string;
}

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateProfile: (updates: {
    name?: string;
    phone?: string;
    githubConnected?: boolean;
    githubUsername?: string;
  }) => Promise<void>;
  addXp: (
    xpAmount: number,
    activityTitle: string,
    completedQuizId?: number,
    completedChallengeId?: number
  ) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch session on mount
  const refreshUser = async () => {
    try {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error("Error checking session:", e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Gagal masuk.");
      }

      setUser(data.user);
      setLoading(false);
      router.push("/dashboard");
    } catch (e: any) {
      setLoading(false);
      throw e;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Gagal mendaftar.");
      }

      setUser(data.user);
      setLoading(false);
      router.push("/dashboard");
    } catch (e: any) {
      setLoading(false);
      throw e;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
    } catch (e) {
      console.error("Error logging out:", e);
    }
  };

  const updateProfile = async (updates: {
    name?: string;
    phone?: string;
    githubConnected?: boolean;
    githubUsername?: string;
  }) => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Gagal memperbarui profil.");
      }

      setUser(data.user);
    } catch (e: any) {
      console.error("Error updating profile:", e);
      throw e;
    }
  };

  const addXp = async (
    xpAmount: number,
    activityTitle: string,
    completedQuizId?: number,
    completedChallengeId?: number
  ) => {
    try {
      const response = await fetch("/api/user/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          xpAmount,
          activityTitle,
          completedQuizId,
          completedChallengeId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      }
    } catch (e) {
      console.error("Error updating progress/XP:", e);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        updateProfile,
        addXp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
