'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ResultTable({ results, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editedStudent, setEditedStudent] = useState('');
  const [editedSubject, setEditedSubject] = useState('');
  const [editedExam, seteditedExam] = useState('');
  const [editedMarks, setEditedMarks] = useState('');

  const startEdit = (result) => {
    setEditingId(result.id);
    setEditedSubject(result.subject);
    setEditedStudent(result.studentId);
    seteditedExam(result.exam);
    setEditedMarks(result.marks);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdate = async (id) => {
    const res = await fetch(`/api/result`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        subject: editedSubject,
        exam: editedExam,
        marks: editedMarks,
      }),
    });

    if (res.ok) {
      toast.success('✅ result updated');
      setEditingId(null);
      onUpdate();
    } else {
      toast.error('❌ Failed to update');
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/result`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      toast.success('🗑️ Result deleted');
      onUpdate();
    } else {
      toast.error('❌ Delete failed');
    }
  };

  return (
    <div className="w-full overflow-x-auto bg-white p-4 sm:p-6 rounded-2xl shadow-md mt-6 border border-gray-100">
  <table className="min-w-full table-auto border-collapse text-sm">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="border px-4 py-2 text-left">#</th>
        <th className="border px-4 py-2 text-left">Student</th>
        <th className="border px-4 py-2 text-left">Subject</th>
        <th className="border px-4 py-2 text-left">Exam</th>
        <th className="border px-4 py-2 text-left">Marks</th>
        <th className="border px-4 py-2 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {results.map((s, index) => (
        <tr key={s.id} className="hover:bg-gray-50">
          <td className="border px-4 py-2">{index + 1}</td>

          <td className="border px-4 py-2">
            {editingId === s.id ? (
              <input readOnly
                value={editedStudent}
                onChange={(e) => setEditedStudent(e.target.value)}
                className="border rounded px-2 py-1 w-full text-sm"
              />
            ) : (
              s.studentId
            )}
          </td>

          

          <td className="border px-4 py-2">
            {editingId === s.id ? (
              <input
                value={editedSubject}
                onChange={(e) => setEditedSubject(e.target.value)}
                className="border rounded px-2 py-1 w-full text-sm"
              />
            ) : (
              s.subject
            )}
          </td>

          
          <td className="border px-4 py-2">
            {editingId === s.id ? (
              <input
                value={editedExam}
                onChange={(e) => seteditedExam(e.target.value)}
                className="border rounded px-2 py-1 w-full text-sm"
              />
            ) : (
              s.exam
            )}
          </td>


           <td className="border px-4 py-2">
            {editingId === s.id ? (
              <input
                value={editedMarks}
                onChange={(e) => seteditedMarks(e.target.value)}
                className="border rounded px-2 py-1 w-full text-sm"
              />
            ) : (
              s.marks
            )}
          </td>

          


          <td className="border px-4 py-2 space-x-1 whitespace-nowrap">
            {editingId === s.id ? (
              <>
                <button
                  onClick={() => handleUpdate(s.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                >
                  Update
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => startEdit(s)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}
