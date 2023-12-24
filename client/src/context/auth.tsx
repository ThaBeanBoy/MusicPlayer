/*
Author: https://github.com/daniellaera
GitHub: https://github.com/daniellaera/react-supabase-auth-provider/blob/main/src/hooks/Auth.tsx
YouTube: https://www.youtube.com/watch?v=r7SAlIlMs1k
*/
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
} from 'react';
import supabase from '../backend/supabase';

// create a context for authentication
export type User = SupabaseUser & {
  id: string;
  profile_img_src: string | null;
  username: string;
};

const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
}>({ session: null, user: null, signOut: () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  const loadUser = async (session: Session) => {
    if (session.user) {
      const { data: user_infos } = await supabase
        .from('user_info')
        .select()
        .eq('id', session?.user.id);

      if (user_infos) {
        setUser({ ...session?.user, ...user_infos[0] });
      }
    }
  };

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session);
      if (session) {
        await loadUser(session);
      }
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session) {
          await loadUser(session);
        }

        setLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    signOut: () => supabase.auth.signOut(),
  };

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
