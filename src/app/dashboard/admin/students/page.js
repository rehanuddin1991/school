// app/dashboard/admin/students/page.jsx
'use client';
 
import AddStudentForm from '../Components/AddStudentForm';
import StudentTable from '../Components/StudentTable';
 
import { useState, useEffect } from 'react';

export default function StudentPage() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await fetch('/api/students');
    const data = await res.json();
    setStudents(data.students);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center mt-2">👨‍🎓 Student Management</h1>
      <AddStudentForm onStudentAdded={fetchStudents} />
      <StudentTable students={students} onUpdate={fetchStudents} />
    </div>
  );
}
