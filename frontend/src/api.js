const API_URL = "https://medibuddy-f0ao.onrender.com/api";

export const searchMedicines = async (query) => {
    const response = await fetch(
        `${API_URL}/medicines?search=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch medicines");
    }

    return response.json();
};