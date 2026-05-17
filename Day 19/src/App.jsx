import { useMemo, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import StudentList from "./components/StudentList";
import { useTheme } from "./context/ThemeContext";  // Changed this

function App() {
    const { darkMode } = useTheme();  // Changed this

    // ... rest of your state and functions remain the same ...
    const [search, setSearch] = useState("");
    const [studentName, setStudentName] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [studentNotes, setStudentNotes] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    const [students, setStudents] = useState(() => {
        try {
            const raw = localStorage.getItem("students");
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "string") {
                    return parsed.map((name, i) => ({ id: `${Date.now()}-${i}-${name}`, name }));
                }
                return parsed;
            }
        } catch (e) {
            console.warn("Failed to load students from localStorage", e);
        }

        return [
            { id: "s1", name: "Sohail", email: "sohail@example.com", notes: "Senior" },
            { id: "s2", name: "Ayaan", email: "ayaan@example.com", notes: "Prefers math" },
            { id: "s3", name: "Ali", email: "ali@example.com", notes: "Exchange student" },
            { id: "s4", name: "Fatima", email: "fatima@example.com", notes: "Excellent in science" },
            { id: "s5", name: "Ahmed", email: "ahmed@example.com", notes: "Missing assignments" },
            { id: "s6", name: "Zara", email: "zara@example.com", notes: "Top performer" },
        ];
    });

    const addStudent = () => {
        if (studentName.trim() === "") return;

        const newStudent = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            name: studentName.trim(),
            email: studentEmail.trim(),
            notes: studentNotes.trim(),
        };

        setStudents((prev) => [...prev, newStudent]);
        setStudentName("");
        setStudentEmail("");
        setStudentNotes("");
        setShowAddForm(false);
    };

    const deleteStudent = (id) => {
        setStudents((prev) => prev.filter((s) => s.id !== id));
    };

    useEffect(() => {
        try {
            localStorage.setItem('students', JSON.stringify(students));
        } catch (e) {
            console.warn('Failed to save students', e);
        }
    }, [students]);

    const filteredStudents = useMemo(() => {
        return students.filter((student) =>
            student.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, students]);

    return (
        <div className={darkMode ? "dark" : "light"}>
            <div className="container">
                <Navbar />

                <div className="form-row">
                    {!showAddForm ? (
                        <button className="btn btn--primary" onClick={() => setShowAddForm(true)}>
                            Add Student
                        </button>
                    ) : (
                        <div className="input-group" style={{ width: '100%' }}>
                            <input 
                                type="text" 
                                placeholder="Full name" 
                                value={studentName} 
                                onChange={(e) => setStudentName(e.target.value)} 
                                aria-label="Full name" 
                            />
                            <input 
                                type="email" 
                                placeholder="Email (optional)" 
                                value={studentEmail} 
                                onChange={(e) => setStudentEmail(e.target.value)} 
                                aria-label="Email" 
                            />
                            <input 
                                type="text" 
                                placeholder="Notes (optional)" 
                                value={studentNotes} 
                                onChange={(e) => setStudentNotes(e.target.value)} 
                                aria-label="Notes" 
                            />
                            <button className="btn btn--primary" onClick={addStudent}>
                                Save
                            </button>
                            <button 
                                className="btn btn--ghost" 
                                onClick={() => {
                                    setShowAddForm(false);
                                    setStudentName('');
                                    setStudentEmail('');
                                    setStudentNotes('');
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                <div className="form-row">
                    <SearchBar search={search} setSearch={setSearch} />
                </div>

                <StudentList students={filteredStudents} deleteStudent={deleteStudent} />
            </div>
        </div>
    );
}

export default App;