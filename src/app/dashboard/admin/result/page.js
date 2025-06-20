'use client';
import { useEffect, useState } from 'react';
import ResultTable from '../Components/ResultTable';
 import toast from 'react-hot-toast';

import { useRouter } from "next/navigation";
export default function ResultPage() {
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [exam, setExam] = useState('');
  const [studentId, setStudentId] = useState('');
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [editData, setEditData] = useState(null);


  const fetchResult = async () => {
      const res = await fetch('/api/result');
      const data = await res.json();
       
      setResults(data.results);
    };
  
     



 useEffect(() => {
  const fetchData = async () => {
    try {
      const studentRes = await fetch('/api/students');
      const data = await studentRes.json();
      setStudents(data.students);

      const resultRes = await fetch('/api/results');
      const resultsData = await resultRes.json();
      setResults(resultsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
  fetchResult();
}, []);


 const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject  || !exam || !marks) {
      alert("Please fill in   subject exam and marks.");
      return;
    }

    try {
         
      const res = await fetch("/api/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({subject, exam, marks, studentId}),
      });

      // ✅ শুধুমাত্র একবার parse করুন

      if (res.ok) {
         const data = await res.json();
        toast.success('✅Registration successful!');
        
        setSubject('');
    setMarks('');
    setExam('');
    setStudentId('');
    fetchResult();
         
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong with the server.");
    }
  };


   

  

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Student Result</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 bg-white p-4 rounded shadow">
        <select value={studentId} onChange={e => setStudentId(e.target.value)} className="p-2 border rounded">
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <select value={exam} onChange={e => setExam(e.target.value)} className="p-2 border rounded">
          <option value="">Select Exam</option>
          <option value="FIRST">FIRST</option>
          <option value="SECOND">SECOND</option>
           <option value="ANNUAL">ANNUAL</option>
          <option value="MIDTERM">MIDTERM</option>          
          <option value="TEST">TEST</option>          
          <option value="OTHERS">OTHERS</option>          
         
        </select>

        <select value={subject} onChange={e => setSubject(e.target.value)} className="p-2 border rounded">
          <option value="">Select Subject</option>
          <option value="BANGLA">BANGLA</option>
          <option value="ENGLISH">ENGLISH</option>
           <option value="MATH">MATH</option>
          <option value="ICT">ICT</option>          
          <option value="RELIGION">RELIGION</option>          
          <option value="SCIENCE">SCIENCE</option>          
          <option value="PHYSICS">PHYSICS</option>          
          <option value="CHEMISTRY">CHEMISTRY</option>          
          <option value="BIOLOGY">BIOLOGY</option>          
          <option value="HIGHER_MATH">HIGHER MATH</option>          
                  
          <option value="AGRICULTURE">AGRICULTURE</option>          
          
          <option value="ACCOUNTING">ACCOUNTING</option>
        <option value="BUSINESS_STUDIES">BUSINESS STUDIES </option>
        <option value="FINANCE">FINANCE</option>
        <option value="ECONOMICS">ECONOMICS</option>
        <option value="HISTORY">HISTORY</option>
        <option value="CIVICS">CIVICS</option>
        <option value="GEOGRAPHY">GEOGRAPHY</option>
        <option value="LOGIC">LOGIC</option>
        <option value="SOCIOLOGY">SOCIOLOGY</option>
        <option value="SOCIAL_WORK">SOCIAL WORK</option>
        <option value="PSYCHOLOGY">PSYCHOLOGY</option>       
         
        </select>



        
        <input value={marks} onChange={e => setMarks(e.target.value)} placeholder="Marks" type="number" className="p-2 border rounded" />

        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Submit
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-8">All Results</h3>
       

       <ResultTable results={results} onUpdate={fetchResult} />
    </div>
  );
}
