const express = require("express");
const cors = require("cors");
require("dotenv").config();

const medicineRoutes = require("./routes/medicineRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/medicines", medicineRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "MediBuddy Backend Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});