const { getMedicines } = require("../services/medicineServices");

const searchMedicines = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            return res.status(400).json({
                message: "Search query is required"
            });
        }

        const medicines = await getMedicines(search);

        res.json(medicines);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch medicines"
        });
    }
};

module.exports = { searchMedicines };