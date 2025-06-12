import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const handleRegister = () => {
    register(username, password);
    alert('Registered! You can now login.');
  };

  return (
    <div>
      <h1>Register</h1>
      <input onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
