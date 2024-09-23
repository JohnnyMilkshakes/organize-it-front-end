import { useState, useEffect } from "react";
import { getLocations } from "../../services/locations";
import { getItems } from "../../services/items";
import LocationTile from "../../components/LocationTile/LocationTile";
import ItemTile from "../../components/ItemTile/ItemTile";
import LogoutButton from "../../components/NavButtons/LogoutButton";
import { useParams } from "react-router-dom";  // Assuming you're getting locationId from the URL

const Profile = ({ setIsSignedIn }) => {
  const { locationId } = useParams();  // Get locationId from the URL (if applicable)
  const [locations, setLocations] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userLocations = await getLocations();
        setLocations(userLocations);
        setFilteredLocations(userLocations);

        // Only fetch items if locationId is defined
        if (locationId) {
          const userItems = await getItems(locationId);
          setItems(userItems);
          setFilteredItems(userItems);
        } else {
          console.error("Location ID is undefined");
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [locationId]);

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredLoc = locations.filter((location) =>
      location.name.toLowerCase().includes(query)
    );

    const filteredItm = items.filter((item) =>
      item.name.toLowerCase().includes(query)
    );

    setFilteredLocations(filteredLoc);
    setFilteredItems(filteredItm);
  };

  return (
    <div className="profile-container">
      <LogoutButton setIsSignedIn={setIsSignedIn} />
      <h1>Your Profile</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search locations and items..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      {/* Render Filtered Locations */}
      <h2>Created Locations</h2>
      <ul>
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <LocationTile key={location.id} location={location} />
          ))
        ) : (
          <li>No locations found.</li>
        )}
      </ul>

      {/* Render Filtered Items */}
      {locationId && (
        <>
          <h2>Items</h2>
          <ul>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ItemTile key={item.id} item={item} />
              ))
            ) : (
              <li>No items found for this location.</li>
            )}
          </ul>
        </>
      )}

      {/* Show/Hide form */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New Location"}
      </button>

      {/* Conditionally render the form */}
      {showForm && <LocationForm setLocations={setLocations} setShowForm={setShowForm} />}
    </div>
  );
};

export default Profile;

