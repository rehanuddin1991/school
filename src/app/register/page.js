"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [ name, setName] = useState("");
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email  || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    try {
         
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json(); // ✅ শুধুমাত্র একবার parse করুন

      if (res.ok) {
        alert("Registration successful!");
        router.push("/login");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong with the server.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Register</h2>

         <input
          type="text"
          className="w-full mb-3 p-2 border rounded"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
       


        <input
          type="password"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />


        <select className="w-full mb-3 p-2 border rounded" value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="USER">User</option>
  <option value="ADMIN">Admin</option>
</select>



        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </main>
  );
}
