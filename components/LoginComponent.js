import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login(username, password);
    router.push('/dashboard');
  };

  return (
    <div>
      <h1>Login</h1>
      <input onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
