"use client";

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  //const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to home or login after logout
  };

  return (
    <header>
      <nav className="navList">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/todo">ToDo App</a>

        {!user ? (
          <>
            <a href="/RegistrationPage">Registration</a>
            <a href="/loginPage">Login</a>
          </>
        ) : (
          <div className="profile-menu">
            <a href="/dashboard">Dashboard</a>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>
    </header>
  );
}
