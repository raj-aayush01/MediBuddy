const express = require("express");

const {
    searchMedicines
} = require("../controllers/medicineController");

const router = express.Router();

router.get("/", searchMedicines);

module.exports = router;