import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateWarehouse } from "../redux/warehouseSlice.js";

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const warehouse = useSelector((state) =>
    state.warehouse.data.find((w) => w.id === id)
  );
  const [formData, setFormData] = useState({ ...warehouse });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    dispatch(updateWarehouse(formData));
    navigate("/");
  };

  return (
    <div className="container details-form">
      <h2>Edit Warehouse</h2>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="city" value={formData.city} onChange={handleChange} />
      <input name="cluster" value={formData.cluster} onChange={handleChange} />
      <input
        name="space_available"
        type="number"
        value={formData.space_available}
        onChange={handleChange}
      />
      <label>
        Live:
        <input
          type="checkbox"
          name="is_live"
          checked={formData.is_live}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default DetailsPage;
