'use client';
import { useEffect, useState } from 'react';

export default function FeeTable() {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const fetchFees = async () => {
      const res = await fetch('/api/fee');
      const data = await res.json();
      setFees(data);
    };
    fetchFees();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">📊 Student Fee List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-blue-300 rounded">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Student Name</th>
              <th className="py-2 px-4 border">Class</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Method</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {fees.length > 0 ? (
              fees.map((fee, index) => (
                <tr key={fee.id} className="text-center border-t hover:bg-blue-50">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{fee.student.name}</td>
                  <td className="py-2 px-4 border">{fee.student.className}</td>
                  <td className="py-2 px-4 border">{fee.type}</td>
                  <td className="py-2 px-4 border">৳{fee.amount}</td>
                  <td className={`py-2 px-4 border ${fee.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                    {fee.status}
                  </td>
                  <td className="py-2 px-4 border">{fee.method || '-'}</td>
                  <td className="py-2 px-4 border">
                    {fee.paidDate ? new Date(fee.paidDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-2 px-4 border space-x-2">
                    <button className="bg-yellow-400 text-white px-2 py-1 rounded">Edit</button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">No fee records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
