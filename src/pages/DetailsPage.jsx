import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateWarehouse } from "../redux/warehouseSlice.js";

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const warehouse = useSelector((state) =>
    state.warehouse.data.find((w) => w.id === Number(id))
  );

  const [formData, setFormData] = useState({ ...warehouse });
  const [customFields, setCustomFields] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCustomChange = (index, field, value) => {
    const updated = [...customFields];
    updated[index][field] = value;
    setCustomFields(updated);
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { key: "", value: "" }]);
  };

  const handleSave = () => {
    const customFieldData = customFields.reduce((acc, curr) => {
      if (curr.key.trim()) acc[curr.key] = curr.value;
      return acc;
    }, {});
    dispatch(updateWarehouse({ ...formData, customFields: customFieldData }));
    navigate("/");
  };

  return (
    <div className="details-container">
      <h2 className="page-title">Warehouse Details</h2>

      <div className="form-group">
        <label className="form-label">Warehouse Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          readOnly={!isEditing}
          className="form-input"
        />

        <label className="form-label">City:</label>
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          readOnly={!isEditing}
          className="form-input"
        />

        <label className="form-label">Cluster:</label>
        <input
          name="cluster"
          value={formData.cluster}
          onChange={handleChange}
          readOnly={!isEditing}
          className="form-input"
        />

        <label className="form-label">Space Available:</label>
        <input
          name="space_available"
          type="number"
          value={formData.space_available}
          onChange={handleChange}
          readOnly={!isEditing}
          className="form-input"
        />

        <label className="form-label checkbox-label">
          <input
            type="checkbox"
            name="is_live"
            checked={formData.is_live}
            onChange={handleChange}
            disabled={!isEditing}
          />
          Live
        </label>
      </div>

      {isEditing && (
        <div className="custom-fields">
          <h3>Custom Fields</h3>
          {customFields.map((field, index) => (
            <div className="custom-field-row" key={index}>
              <input
                placeholder="Key"
                className="form-input"
                value={field.key}
                onChange={(e) =>
                  handleCustomChange(index, "key", e.target.value)
                }
              />
              <input
                placeholder="Value"
                className="form-input"
                value={field.value}
                onChange={(e) =>
                  handleCustomChange(index, "value", e.target.value)
                }
              />
            </div>
          ))}
          <button onClick={addCustomField} className="btn btn-secondary">
            + Add Custom Field
          </button>
        </div>
      )}

      <div className="button-group">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-warning"
          >
            Edit
          </button>
        ) : (
          <button onClick={handleSave} className="btn btn-success">
            Save
          </button>
        )}
        <button onClick={() => navigate("/")} className="btn btn-gray">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;
