import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

function MedicineDetails() {
  const location = useLocation();
  const medicine = location.state?.medicine;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If user directly opens /medicine without selecting a medicine
  if (!medicine) {
    return (
      <div className="details-page">
        <h2>Medicine not found</h2>

        <Link to="/" className="back-button">
          ← Back to Search
        </Link>
      </div>
    );
  }

  const openfda = medicine.openfda || {};

  const getField = (field) => {
    return medicine[field]?.[0] || "Information not available";
  };

  const brand = openfda.brand_name?.[0] || "Unknown";
  const generic = openfda.generic_name?.[0] || "Information not available";
  const manufacturer =
    openfda.manufacturer_name?.[0] || "Information not available";
  const route = openfda.route?.[0] || "Information not available";

  return (
    <div className="details-page">

      <Link to="/" className="back-button">
        ← Back to Search
      </Link>

      <h1>{brand}</h1>

      <div className="details-section">
        <h2>Basic Information</h2>

        <p>
          <strong>Generic Name:</strong> {generic}
        </p>

        <p>
          <strong>Active Ingredient:</strong>{" "}
          {getField("active_ingredient")}
        </p>

        <p>
          <strong>Purpose:</strong> {getField("purpose")}
        </p>

        <p>
          <strong>Route:</strong> {route}
        </p>

        <p>
          <strong>Manufacturer:</strong> {manufacturer}
        </p>
      </div>

      <div className="details-section">
        <h2>Uses</h2>
        <p>{getField("indications_and_usage")}</p>
      </div>

      <div className="details-section">
        <h2>Dosage & Administration</h2>
        <p>{getField("dosage_and_administration")}</p>
      </div>

      <div className="details-section warning-section">
        <h2>Warnings</h2>
        <p>{getField("warnings")}</p>
      </div>

      <div className="details-section">
        <h2>Do Not Use</h2>
        <p>{getField("do_not_use")}</p>
      </div>

      <div className="details-section">
        <h2>Ask a Doctor</h2>
        <p>{getField("ask_doctor")}</p>
      </div>

      <div className="details-section">
        <h2>Pregnancy / Breastfeeding</h2>
        <p>{getField("pregnancy_or_breast_feeding")}</p>
      </div>

    </div>
  );
}

export default MedicineDetails;