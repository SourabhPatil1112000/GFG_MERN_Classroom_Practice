import { useTheme } from "../context/ThemeContext";

function Navbar() {
    const { darkMode, setDarkMode } = useTheme();
    
    return (
        <div className="navbar">
            <h2>Student Dashboard</h2>
            <button className="btn btn--ghost" onClick={setDarkMode}>
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
        </div>
    );
}

export default Navbar;