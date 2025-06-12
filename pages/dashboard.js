import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <p>Your token: {user.token}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
