import { useState, useEffect } from "react";
import { getItems } from "../../services/items"; // Service to get items for a location
import { getLocation } from "../../services/locations";
import { useParams } from "react-router-dom";
import ItemForm from "../../components/ItemForm/ItemForm";
import ItemTile from "../../components/ItemTile/ItemTile";

const Location = () => {
  const { locationId } = useParams();
  const [site, setSite] = useState(null); 
  const [items, setItems] = useState([]); // Track items for selected location
  const [showForm, setShowForm] = useState(false); // Show/hide the add item form

  useEffect(() => {
    const fetchSite = async () => {
      try {
        const data = await getLocation(locationId);
        setSite(data);
      } catch (err) {
        console.log("Failed to load locations", err);
      }
    };
    fetchSite();
  }, [locationId]);

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
      {site ? (
        <>
          <h1>Location: {site.name}</h1>
          <p>{site.address}</p>

          <div>

            {/* Display items for the selected location */}
            {items.length > 0 && (
              <>
                <h2>Items</h2>
                <ul>
                  {items.map((item) => (
                    <ItemTile
                      locationId={locationId}
                      item={item}
                      key={item.id}
                    />
                  ))}
                </ul>
              </>
            )}

            <button onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "Add New Item"}
            </button>

          </div>

          {showForm && (
            <ItemForm
              locationId={locationId}
              setShowForm={setShowForm}
              setItems={setItems}
            />
          )}
        </>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default Location;
