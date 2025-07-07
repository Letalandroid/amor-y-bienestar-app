
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  email?: string;
  isAnonymous: boolean;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginAnonymously: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          isAnonymous: false,
          createdAt: new Date(session.user.created_at)
        });
      } else {
        // Check for anonymous user in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
      setIsLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            isAnonymous: false,
            createdAt: new Date(session.user.created_at)
          });
          localStorage.removeItem('user'); // Clear anonymous user
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          isAnonymous: false,
          createdAt: new Date(data.user.created_at)
        });
        localStorage.removeItem('user'); // Clear anonymous user
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          isAnonymous: false,
          createdAt: new Date(data.user.created_at)
        });
        localStorage.removeItem('user'); // Clear anonymous user
      }
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAnonymously = () => {
    const anonymousUser: User = {
      id: 'anonymous_' + Math.random().toString(36).substr(2, 9),
      isAnonymous: true,
      createdAt: new Date()
    };
    setUser(anonymousUser);
    localStorage.setItem('user', JSON.stringify(anonymousUser));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      loginAnonymously,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
