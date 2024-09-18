import { useState, useEffect } from "react";
import { getItems } from "../../services/items"; // Service to get items for a location
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ItemForm from "../../components/ItemForm/ItemForm";

const Location = () => {
  const { locationId } = useParams();
  const [items, setItems] = useState([]); // Track items for selected location
  const [showForm, setShowForm] = useState(false); // Show/hide the add item form

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems(locationId);
        setItems(data);
      } catch (err) {
        console.log("Failed to load locations", err);
      }
    };
    fetchItems();
  }, [locationId]);

  return (
    <div>
      {location ? (
        <>
          <h1>Location: {location.name}</h1>
          <p>{location.address}</p>
        </>
      ) : (
        <p>Loading location...</p>
      )}

      {/* Display items for the selected location */}
      {locationId && items.length > 0 && (
        <div>
          <h2>Items</h2>
          <ul>
            {items.map((item) => (
              <Link
                to={`/locations/${locationId}/items/${item.id}`}
                key={item.id}
              >
                <li>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Storage Area: {item.storage_area}</p>
                </li>
              </Link>
            ))}
          </ul>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Add New Item"}
          </button>
        </div>
      )}

      {showForm && (
        <ItemForm
          locationId={locationId}
          setShowForm={setShowForm}
          setItems={setItems}
        />
      )}
    </div>
  );
};

export default Location;
