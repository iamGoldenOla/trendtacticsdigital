// Authentication Context Provider
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, onAuthStateChange, getCurrentUser } from '../utils/supabaseClient';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Check active session
  const checkUser = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
    } finally {
      setLoading(false);
      setAuthInitialized(true);
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    checkUser();
    
    // Listen for auth state changes
    const { data: authListener } = onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [checkUser]);

  // Auth context values
  const value = {
    user,
    loading,
    authInitialized,
    isAuthenticated: !!user,
    refreshUser: checkUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Protected Route Component
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, authInitialized } = useAuth();

  if (loading || !authInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Access Denied</h2>
          <p className="text-center text-gray-600 mb-6">
            You need to be logged in to view this content.
          </p>
          <a 
            href="/login" 
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg transition text-center block"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return children;
}