import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../redux/warehouseSlice.js";

const ListingPage = () => {
  const dispatch = useDispatch();
  const { data, filters } = useSelector((state) => state.warehouse);

  const cities = [...new Set(data.map((w) => w.city))];
  const clusters = [...new Set(data.map((w) => w.cluster))];

  const filteredData = data.filter(
    (w) =>
      w.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      (filters.city ? w.city === filters.city : true) &&
      (filters.cluster ? w.cluster === filters.cluster : true) &&
      w.space_available >= filters.spaceAvailable
  );

  return (
    <div className="container">
      <h1 className="page-title">🏢 Warehouse Listings</h1>

      {/* Filters */}
      <div className="filter-panel">
        <input
          onChange={(e) =>
            dispatch(setFilters({ searchQuery: e.target.value }))
          }
          placeholder="🔍 Search by name"
          className="input-field"
        />

        <select
          onChange={(e) => dispatch(setFilters({ city: e.target.value }))}
          className="select-field"
        >
          <option value="">🌆 All Cities</option>
          {cities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => dispatch(setFilters({ cluster: e.target.value }))}
          className="select-field"
        >
          <option value="">🧩 All Clusters</option>
          {clusters.map((cluster, idx) => (
            <option key={idx} value={cluster}>
              {cluster}
            </option>
          ))}
        </select>

        <input
          type="number"
          onChange={(e) =>
            dispatch(setFilters({ spaceAvailable: Number(e.target.value) }))
          }
          placeholder="📦 Min Space"
          className="input-field"
        />
      </div>

      {/* Listings */}
      {filteredData.length === 0 ? (
        <p className="no-results">❌ No warehouses found matching criteria.</p>
      ) : (
        <ul className="warehouse-grid">
          {filteredData.map((w) => (
            <li key={w.id} className="warehouse-card">
              <Link to={`/warehouse/${w.id}`} className="warehouse-title">
                {w.name}
              </Link>
              <p className="warehouse-meta">
                📍 {w.city} | 🧭 {w.cluster} | 📦 {w.space_available} sq.ft.
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListingPage;
