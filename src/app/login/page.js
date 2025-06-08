
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    let data;

try {
  data = await res.json();
} catch (err) {
  console.error("JSON parse error:", err);
  alert("Server returned invalid response");
  return;
}

if (res.ok) {
  document.cookie = `token=${data.token}; path=/`;
  router.push(data.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/user');
} else {
  alert(data.message || "Login failed");
}
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          type="email"
          placeholder="Email"
        />
        <input value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          type="password"
          placeholder="Password" 
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>


    
  );
}


 
 
