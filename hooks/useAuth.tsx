import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  updateProfile,
} from 'firebase/auth';

import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string, profileImageUrl: string | null) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();
  const storage = getStorage();

  // Persisting the user
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
          setLoading(false)
        } else {
          // Not logged in...
          setUser(null)
          setLoading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (email: string, password: string, profileImageUrl: string | null) => {
    setLoading(true);
  
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          setUser(userCredential.user);
          setLoading(false);
          // console.log('Redirecting to /');
          router.push('/');
  
          if (profileImageUrl) {
            const storageRef = ref(storage, `profile-images/${userCredential.user.uid}`);
            const response = await fetch(profileImageUrl);
            const blob = await response.blob();
            const uploadTask = uploadBytes(storageRef, blob);
  
            uploadTask.then(async () => {
              const downloadURL = await getDownloadURL(storageRef);
              await updateProfile(userCredential.user, {
                photoURL: downloadURL,
              });
            }).catch((error: unknown) => {
              const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
              console.error(errorMessage);
              setLoading(false);
              alert(errorMessage);
            });
          }
        })
        .catch((error) => {
          const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
          console.error(errorMessage);
          setLoading(false);
          alert(errorMessage);
        });
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
      console.error(errorMessage);
      setLoading(false);
      alert(errorMessage);
    }
  };
  
 
  

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      setUser(user);
      // console.log('Redirecting to /');
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.error(errorMessage);
        setError(errorMessage);
        alert(errorMessage);
      } else {
        console.error('Unknown error occurred');
        alert('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      loading,
      logout,
      error,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

