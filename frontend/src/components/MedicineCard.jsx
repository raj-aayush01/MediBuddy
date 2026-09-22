import { Link } from "react-router-dom";

function MedicineCard({ medicine }) {
  const openfda = medicine.openfda || {};

  const brand = openfda.brand_name?.[0] || "Unknown";
  const generic = openfda.generic_name?.[0] || "N/A";
  const manufacturer = openfda.manufacturer_name?.[0] || "N/A";
  const route = openfda.route?.[0] || "N/A";

  const activeIngredient = medicine.active_ingredient?.[0] || "N/A";
  const purpose = medicine.purpose?.[0] || "N/A";
  const uses = medicine.indications_and_usage?.[0] || "N/A";

  return (
    <div className="medicine-card">
      <h2>{brand}</h2>

      <div className="medicine-info">
        <p><strong>Generic:</strong> {generic}</p>

        <p>
          <strong>Active Ingredient:</strong> {activeIngredient}
        </p>

        <p><strong>Purpose:</strong> {purpose}</p>

        <p>
          <strong>Uses:</strong>{" "}
          {uses.length > 180 ? uses.substring(0, 180) + "..." : uses}
        </p>

        <p><strong>Route:</strong> {route}</p>

        <p><strong>Manufacturer:</strong> {manufacturer}</p>
      </div>

      <Link
        to="/medicine"
        state={{ medicine }}
        className="details-button"
      >
        View Details
      </Link>
    </div>
  );
}

export default MedicineCard;