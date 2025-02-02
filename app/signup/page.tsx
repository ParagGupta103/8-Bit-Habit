"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert("Sign up successful!");
      router.push("/login");
    } else {
      const error = await res.json();
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form onSubmit={handleSignUp} className="bg-gray-800 p-8 rounded-lg space-y-6">
        <h1 className="text-white text-2xl">Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2"
          required
        />
        <button type="submit" className="w-full bg-green-500 p-2 text-white">
          Sign Up
        </button>
      </form>
    </div>
  );
}
