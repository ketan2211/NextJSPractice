"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const UserProfile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loginStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loginStatus);

      const storedData = localStorage.getItem("UserData");
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          setUserData(parsed);
        } catch (err) {
          console.error("Error parsing stored user data");
        }
      }

      setHydrated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/loginPage");
  };

  if (!hydrated) return null;

  if (!isLoggedIn) {
    return <p>Please log in to view your profile.</p>;
  }

  if (!userData?.name || !userData?.email) {
    return <p>Loading user data...</p>;
  }

  return (
    <div>
      <h1>Welcome, {userData.name}!</h1>
      <p>Email: {userData.email}</p>
      <p>Street: {userData.street}</p>
      <p>City: {userData.city}</p>

      <div className="profile-menu">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
