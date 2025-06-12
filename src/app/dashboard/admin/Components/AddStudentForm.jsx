// app/dashboard/admin/students/AddStudentForm.jsx
'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AddStudentForm({ onStudentAdded }) {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phonePattern = /^[0-9]{11}$/;
  if (!phonePattern.test(phone)) {
     toast.error('📱 Phone number must be exactly 11 digits');
    return;
  }
    const res = await fetch('/api/students', {
      method: 'POST',
      body: JSON.stringify({ name, className,phone }),
    });

    if (res.ok) {
      setName('');
      setClassName('');
      setPhone('');
      onStudentAdded();
    } else {
      alert('Failed to add student');
    }
  };

  return (
   <form
  onSubmit={handleSubmit}
  className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mb-6 space-y-4 bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100"
>
  {/* Student Name */}
  <div>
    <label className="text-blue-800 block text-sm font-medium  mb-1">
      Student Name
    </label>
    <input
      type="text"
      placeholder="Enter student name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 w-full text-sm"
      required
    />
  </div>

  {/* Class Dropdown */}
  <div>
    <label className="block text-sm font-medium text-blue-800 mb-1">
      Class
    </label>
    <select
      value={className}
      onChange={(e) => setClassName(e.target.value)}
      className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 w-full text-sm bg-white"
      required
    >
      <option value="">Select class</option>
      <option value="SIX">SIX</option>
      <option value="SEVEN">SEVEN</option>
      <option value="EIGHT">EIGHT</option>
      <option value="NINE">NINE</option>
      <option value="TEN">TEN</option>
    </select>
  </div>

  {/* 📞 Phone */}
  <div>
    <label className="block text-sm font-medium text-blue-800 mb-1">
      Phone Number
    </label>
    <input
      type="tel"
      placeholder="Enter phone number"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 w-full text-sm"
      required
    />
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-sm"
  >
    ➕ Add Student
  </button>
</form>


  );
}
