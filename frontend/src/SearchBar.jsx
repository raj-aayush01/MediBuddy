import { useState } from "react";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const query = value.trim();

    if (!query) return;

    onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search medicine by brand name..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;