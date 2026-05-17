function StudentList({ students, deleteStudent }) {
    const initials = (name) => name.split(" ").map(s => s[0]).join("").slice(0, 2).toUpperCase();

    if (!students || students.length === 0) {
        return <div className="no-results">No students found</div>;
    }

    return (
        <ul className="student-list">
            {students.map((student) => (
                <li className="student-item" key={student.id}>
                    <div className="student-left">
                        <span className="avatar">{initials(student.name)}</span>
                        <span className="name">{student.name}</span>
                    </div>

                    <div className="student-details">
                        <div className="student-meta">
                            {student.email && <div className="muted">{student.email}</div>}
                            {student.notes && <div className="muted">{student.notes}</div>}
                        </div>
                        <div>
                            <button 
                                className="btn btn--danger" 
                                onClick={() => deleteStudent && deleteStudent(student.id)} 
                                aria-label={`Delete ${student.name}`}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default StudentList;