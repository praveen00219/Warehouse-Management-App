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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Warehouse Listings</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          onChange={(e) =>
            dispatch(setFilters({ searchQuery: e.target.value }))
          }
          placeholder="Search by name"
          className="border px-2 py-1 rounded w-full md:w-auto"
        />

        <select
          onChange={(e) => dispatch(setFilters({ city: e.target.value }))}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Cities</option>
          {cities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => dispatch(setFilters({ cluster: e.target.value }))}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Clusters</option>
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
          placeholder="Min Space"
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* List */}
      {filteredData.length === 0 ? (
        <p>No warehouses found matching criteria.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredData.map((w) => (
            <li
              key={w.id}
              className="p-4 border rounded shadow hover:bg-gray-50"
            >
              <Link
                to={`/warehouse/${w.id}`}
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {w.name}
              </Link>
              <p className="text-sm text-gray-600">
                City: {w.city} | Cluster: {w.cluster} | Space:{" "}
                {w.space_available}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListingPage;
