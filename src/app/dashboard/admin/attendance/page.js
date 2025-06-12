'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
export default function AttendanceUploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const [logs, setLogs] = useState([]);
   const fetchAttendance = async () => {        
      const res = await fetch('/api/attendance/upload');    
       const data = await res.json();
      setLogs(data);
    };

  useEffect(() => {   

    fetchAttendance();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/attendance/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    toast.success("uploaded")
    fetchAttendance();
  };

  return (
 <div>

    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg text-white">
  <h2 className="text-2xl font-extrabold mb-4 text-center">📤 Upload Attendance</h2>
  <form onSubmit={handleUpload} className="space-y-4">
    <input
      type="file"
      accept=".csv"
      onChange={(e) => setFile(e.target.files[0])}
      className="w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-indigo-600 hover:file:bg-gray-100"
    />
    <button
      type="submit"
      className="w-full bg-white text-indigo-700 font-semibold py-2 rounded-full shadow hover:bg-indigo-100 transition duration-200"
    >
      🚀 Upload CSV
    </button>
  </form>
  {message && <p className="mt-4 text-center text-green-200 font-medium">{message}</p>}
</div>

    <div className="p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">📋 Attendance Logs</h1>
      <div className="overflow-x-auto">
       <div className="bg-gray-100 p-6 rounded-lg shadow-md">
  <table className="min-w-full bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
    <thead>
      <tr className="bg-blue-700 text-white">
        <th className="py-3 px-5 border-b border-gray-200">ID</th>
        <th className="py-3 px-5 border-b border-gray-200">User ID</th>
        <th className="py-3 px-5 border-b border-gray-200">Name</th>
        <th className="py-3 px-5 border-b border-gray-200">Timestamp</th>
      </tr>
    </thead>
    <tbody>
      {logs.map((log) => (
        <tr key={log.id} className="bg-gray-50 even:bg-white text-center border-t border-gray-200 hover:bg-blue-50">
          <td className="py-2 px-4">{log.id}</td>
          <td className="py-2 px-4">{log.userId}</td>
          <td className="py-2 px-4">{log.name}</td>
          <td className="py-2 px-4">{new Date(log.timestamp).toLocaleString()}</td>
        </tr>
      ))}
      {logs.length === 0 && (
        <tr>
          <td colSpan="4" className="text-center py-4 text-gray-500">
            No attendance logs found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

      </div>
    </div>
    
    

     </div>
  );
}
