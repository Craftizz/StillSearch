'use client';

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { User } from "@/lib/user/types";

type UserContextType = {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}

export default function UserProvider({ children }:{ children: ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function refreshUser() {

        
    }

    // async function signIn() {

    // }

    // async function signOut() {
        
    // }

    return (
        <UserContext.Provider value={{ user, loading, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
}
