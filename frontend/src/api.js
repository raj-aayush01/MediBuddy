export const searchMedicines = async (query) => {
    const url =
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(query)}"&limit=20`;

    const response = await fetch(url);

    if (response.status === 404) {
        return [];
    }

    if (!response.ok) {
        throw new Error("FDA API request failed");
    }

    const data = await response.json();

    return data.results || [];
};