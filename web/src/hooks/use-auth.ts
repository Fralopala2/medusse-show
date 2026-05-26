"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const token = localStorage.getItem("sessionToken");
    const raw = localStorage.getItem("user");
    if (!token || !raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

/** Dispara tras login/logout para actualizar el Header en la misma pestaña */
export function notifyAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("medusse-auth-change"));
  }
}

export function useAuth() {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setUser(readStoredUser());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("medusse-auth-change", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("medusse-auth-change", refresh);
    };
  }, [refresh, pathname]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
