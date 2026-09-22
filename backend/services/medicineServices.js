const getMedicines = async (search) => {
    const url =
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${encodeURIComponent(search)}&limit=20`;

    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) {
            return [];
        }

        throw new Error("FDA API request failed");
    }

    const data = await response.json();

    return data.results || [];
};

module.exports = { getMedicines };