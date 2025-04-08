import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { sendEmail } from '../lib/email';

interface AuthState {
  user: any | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          captchaToken: undefined // Let Supabase handle captcha if needed
        }
      });
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password');
        }
        throw error;
      }

      // Verify profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (profileError && !profileError.message.includes('not found')) {
        throw profileError;
      }

      // If profile doesn't exist, refresh session to trigger creation
      if (!profile) {
        await supabase.auth.refreshSession();
      }
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email: string, password: string, fullName?: string) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      
      if (error) throw error;

      // Send welcome email
      if (data?.user) {
        await sendEmail({
          recipient: {
            email,
            full_name: fullName,
          },
          template_type: 'welcome',
          data: {
            user_id: data.user.id,
            full_name: fullName,
          },
        });
      }
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) throw error;

      await sendEmail({
        recipient: { email },
        template_type: 'password_reset',
        data: {
          reset_link: `${window.location.origin}/auth/reset-password`,
        },
      });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updatePassword: async (password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.updateUser({
        password,
      });
      
      if (error) throw error;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Initialize auth state with error handling
supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.setState({ 
    user: session?.user || null, 
    isLoading: false 
  });

  // Handle auth errors
  if (event === 'SIGNED_IN' && !session?.user) {
    useAuthStore.setState({ 
      error: 'Authentication failed. Please try again.' 
    });
  }
});