import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
     <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">🏫 স্কুল ম্যানেজমেন্ট সিস্টেম</h1>
      <p className="mb-6 text-gray-700">আপনার স্কুল পরিচালনার জন্য একটি আধুনিক ওয়েব অ্যাপ</p>

      <div className="space-x-4">
        <Link href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg">
          Login
        </Link>
        <Link href="/register" className="px-6 py-2 bg-green-600 text-white rounded-lg">
          Register
        </Link>
      </div>
    </main>
  );
}
