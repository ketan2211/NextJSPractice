"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    street: "",
    city: "",
  });

  useEffect(() => {
    localStorage.setItem("UserData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const savedData = localStorage.getItem("UserData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/loginPage");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSuccess(true);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      street: "",
      city: "",
    });
    setStep(1);
  };

  return (
    <div className="fullDiv">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h2>Personal Information</h2>
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <div className="btnSection">
                <button type="button" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Step 2: Address Information</h2>
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                placeholder="Street"
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                required
              />
            </div>

            <div className="btnSection">
              <button type="button" onClick={handlePrevious}>
                Previous
              </button>
              <button type="button" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>Step 3: Confirmation</h2>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Street: {formData.street}</p>
            <p>City: {formData.city}</p>
            <div className="btnSection">
              <button type="button" onClick={handlePrevious}>
                Previous
              </button>
              <button type="submit">Submit</button>
              <button type="button" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        )}
      </form>

      <style jsx>{`
        .fullDiv {
          position: fixed;
          inset: 0px;
          width: 30rem;
          height: 15rem;
          max-width: 100vw;
          max-height: 100dvh;
          margin: auto;
          border: 1px solid black;
          padding: 10px;
          border-radius: 5px;
        }
        .fullDiv h1 {
          font-size: 24px;
          text-align: center;
        }
        h2 {
          text-align: center;
        }
        input {
          margin: 8px;
          padding: 8px;
          width: 100%;
        }
        button {
          margin: 8px;
          padding: 8px 16px;
          cursor: pointer;
        }
        h1,
        h2 {
          font-family: Arial, sans-serif;
        }
        .btnSection {
          text-align: center;
        }
      `}</style>
    </div>
  );
}
