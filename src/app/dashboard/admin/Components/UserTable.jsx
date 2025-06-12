'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UserTable({ users, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, seteditedEmail] = useState('');
  const [editedRole, setEditedRole] = useState('');

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditedName(user.name);
    seteditedEmail(user.email);
    setEditedRole(user.role);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdate = async (id) => {
    const res = await fetch(`/api/register`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        name: editedName,
        email: editedEmail,
        role: editedRole,
      }),
    });

    if (res.ok) {
      toast.success('✅ user updated');
      setEditingId(null);
      onUpdate();
    } else {
      toast.error('❌ Failed to update');
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/register`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      toast.success('🗑️ User deleted');
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
        <th className="border px-4 py-2 text-left">Name</th>
        <th className="border px-4 py-2 text-left">Email</th>
        <th className="border px-4 py-2 text-left">Role</th>
        <th className="border px-4 py-2 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((s, index) => (
        <tr key={s.id} className="hover:bg-gray-50">
          <td className="border px-4 py-2">{index + 1}</td>

          <td className="border px-4 py-2">
            {editingId === s.id ? (
              <input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border rounded px-2 py-1 w-full text-sm"
              />
            ) : (
              s.name
            )}
          </td>

          
          <td className="border px-4 py-2">
            {editingId === s.id ? (
              <input
                value={editedEmail}
                onChange={(e) => seteditedEmail(e.target.value)}
                className="border rounded px-2 py-1 w-full text-sm"
              />
            ) : (
              s.email
            )}
          </td>

          <td className="border px-4 py-2">
            {editingId === s.id ? (
              <select
                value={editedRole}
                onChange={(e) => setEditedRole(e.target.value)}
                className="border rounded px-2 py-1 w-full text-sm"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
                
              </select>
            ) : (
              s.role
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
