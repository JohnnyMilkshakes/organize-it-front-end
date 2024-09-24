import { useState, useEffect } from "react";
import { getItems } from "../../services/items"; // Service to get items for a location
import { getLocation } from "../../services/locations";
import { useParams } from "react-router-dom";
import ItemForm from "../../components/ItemForm/ItemForm";
import ItemTile from "../../components/ItemTile/ItemTile";
import ProfileButton from "../../components/NavButtons/ProfileButton";
import LogoutButton from "../../components/NavButtons/LogoutButton";
import InventoryBarChart from "../../components/Charts/InventoryBarChart";  // Import the chart component
import "./Location.css";

const Location = ({ setIsSignedIn }) => {
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
        console.log("Failed to load items", err);
      }
    };
    fetchItems();
  }, [locationId]);

  return (
    <div className="location-container">
      {site ? (
        <>
          <div className="nav-buttons">
            <ProfileButton />
            <LogoutButton setIsSignedIn={setIsSignedIn} />
          </div>
          <h1>Location: {site.name}</h1>
          <p>{site.address}</p>

          {/* Add the chart here */}
          {items.length > 0 && (
            <div>
              <h2>Inventory Overview</h2>
              <InventoryBarChart items={items} />  {/* Pass items to the chart */}
            </div>
          )}

          <div>
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

            <div className="button-wrapper">
              <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Add New Item"}
              </button>
            </div>
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
