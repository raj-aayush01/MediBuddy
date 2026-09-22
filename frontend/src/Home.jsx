import { useState } from "react";
import { searchMedicines } from "./api";
import MedicineCard from "./components/MedicineCard";

function Home() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [medicines, setMedicines] = useState(
        JSON.parse(sessionStorage.getItem("medicines") || "[]")
    );

    const [recentSearches, setRecentSearches] = useState(
        JSON.parse(sessionStorage.getItem("recentSearches") || "[]")
    );

    const [searched, setSearched] = useState(
        sessionStorage.getItem("searched") === "true"
    );

    const handleSearch = async (searchValue = query) => {
        if (!searchValue.trim()) return;

        const searchQuery = searchValue.trim();

        try {
            setLoading(true);
            setError("");
            setSearched(true);
            setMedicines([]);

            const data = await searchMedicines(searchQuery);

            setMedicines(data);

            // Save medicines so they remain after going back
            sessionStorage.setItem(
                "medicines",
                JSON.stringify(data)
            );

            // Update recent searches
            setRecentSearches((prev) => {
                const updated = [
                    searchQuery,
                    ...prev.filter((item) => item !== searchQuery)
                ].slice(0, 10);

                sessionStorage.setItem(
                    "recentSearches",
                    JSON.stringify(updated)
                );

                return updated;
            });

            sessionStorage.setItem("searched", "true");

        } catch (err) {
            console.error(err);
            setError("Failed to fetch medicines. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">

            <h1>MediBuddy</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search medicine brand..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />

                <button onClick={() => handleSearch()}>
                    Search
                </button>
            </div>

            {recentSearches.length > 0 && (
                <div className="recent-searches">
                    <h3>Recent Searches</h3>

                    <div className="recent-search-list">
                        {recentSearches.map((search, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setQuery(search);
                                    handleSearch(search);
                                }}
                            >
                                {search}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {loading && (
                <p className="loading">
                    Searching...
                </p>
            )}

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            {searched && !loading && !error && medicines.length === 0 && (
                <p className="no-results">
                    No results found
                </p>
            )}

            <div className="medicine-list">
                {medicines.map((medicine, index) => (
                    <MedicineCard
                        key={medicine.id || index}
                        medicine={medicine}
                    />
                ))}
            </div>

        </div>
    );
}

export default Home;