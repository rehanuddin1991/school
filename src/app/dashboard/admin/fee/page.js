'use client'
import { useEffect, useState } from "react";
import FeeTable from "../Components/FeeTable";
import toast from 'react-hot-toast';
 

export default function Page() {

    const [studentId, setStudentId] = useState('');
const [type, setType] = useState('');
const [amount, setAmount] = useState('');
const [paidDate, setPaidDate] = useState('');
const [method, setMethod] = useState('Cash');
const [status, setStatus] = useState('Paid');

const [students, setStudents] = useState([]);
const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students'); // তোমার API route
      const data = await res.json();
      setStudents(data.students);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

useEffect(() => {
  
  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  setPaidDate(today);
  fetchStudents();
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!studentId || !type || !amount || !status) {
    alert('Please fill in all required fields.');
    return;
  }

  try {
    const res = await fetch('/api/fee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: parseInt(studentId),
        type,
        amount: parseFloat(amount),
        status,
        paidDate: paidDate ? new Date(paidDate).toISOString() : null,
        method,
      }),
    });

    const data = await res.json();

    if (res.ok) {
     
        toast.success('✅Fee added successfully!');
      // Optionally reset form
      setStudentId('');
      setType('');
      setAmount('');
      setPaidDate('');
      setMethod('');
      setStatus('');
    } else {
      alert('❌ Failed to add fee: ' + data.error);
    }
  } catch (error) {
    alert('❌ Error: ' + error.message);
  }
};

  return (
    <main className="container mx-auto">
       <form
  onSubmit={handleSubmit}
  className="max-w-2xl mx-auto space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-md border"
>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
    <select
      onChange={(e) => setStudentId(e.target.value)}
      className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Student</option>
      {students.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name} ({s.className})
        </option>
      ))}
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
    <select
      onChange={(e) => setType(e.target.value)}
      className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Type</option>
      <option value="TUITION">Tuition</option>
      <option value="EXAM">Exam</option>
      <option value="ADMISSION">Admission</option>
      <option value="SPORTS">Sports</option>
      <option value="LAB">Lab</option>
    </select>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
      <input
        type="number"
        placeholder="Enter amount"
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Paid Date</label>
      <input
        type="date"
        onChange={(e) => setPaidDate(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
      <select
        onChange={(e) => setMethod(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Cash">Cash</option>
        <option value="bKash">bKash</option>
        <option value="Bank">Bank</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
      <select
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Paid">Paid</option>
        <option value="Partial">Partial</option>
        <option value="Unpaid">Unpaid</option>
      </select>
    </div>
  </div>

  <div className="text-right">
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-2 rounded-md shadow-sm"
    >
      Submit
    </button>
  </div>
</form>



      <FeeTable />
    </main>
  );
}
