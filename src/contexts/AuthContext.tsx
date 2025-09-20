import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading] = useState(false);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Simulate signup delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        user_metadata: {
          full_name: fullName,
        },
      };
      
      setUser(newUser);
      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: { message: 'Failed to sign up. Please try again.' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Simulate signin delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials
      if (email === 'demo@nutrigen.com' && password === 'demo123') {
        const demoUser: User = {
          id: 'demo-user-123',
          email: 'demo@nutrigen.com',
          user_metadata: {
            full_name: 'Demo User',
          },
        };
        setUser(demoUser);
        return { error: null };
      }
      
      // For any other credentials, create a mock user
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        user_metadata: {
          full_name: 'User',
        },
      };
      
      setUser(mockUser);
      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: { message: 'Failed to sign in. Please check your credentials.' } };
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};