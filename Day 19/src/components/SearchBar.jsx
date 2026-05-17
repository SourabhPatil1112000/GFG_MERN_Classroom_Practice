import { useRef } from "react";

function SearchBar({ search, setSearch }) {
    const inputRef = useRef();
    
    const focusInput = () => {
        inputRef.current.focus();
    };
    
    return (
        <div className="input-group">
            <input 
                className="search-input" 
                type="text"
                ref={inputRef}
                placeholder="Search Student"
                aria-label="Search students"
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
            />
            <button className="btn btn--ghost" onClick={focusInput} aria-label="Focus search">
                Focus
            </button>
        </div>
    );
}

export default SearchBar;