import { useState, useEffect } from "react";
import { getLocations } from "../../services/locations";  // Fetch locations from API
import { getItems } from "../../services/items";  // Fetch items by locationId from API
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import LocationTile from "../../components/LocationTile/LocationTile";  // Render each location
import ItemTile from "../../components/ItemTile/ItemTile";  // Render each item
import LocationForm from "../../components/LocationForm/LocationForm";  // Form to add locations
import LogoutButton from "../../components/NavButtons/LogoutButton";  // Logout functionality
import SearchBar from "../../components/SearchBar/SearchBar";  // Search bar component
import './Profile.css';  // Import CSS for styling

const Profile = ({ setIsSignedIn }) => {
  const [locations, setLocations] = useState([]);
  const [allItems, setAllItems] = useState({});  // Stores items for each location
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);  // Only show items when searched
  const [searchQuery, setSearchQuery] = useState("");  // State for search query
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userLocations = await getLocations();
        setLocations(userLocations);
        setFilteredLocations(userLocations);

        // Fetch items for each location and assign location_id to each item
        const itemsForLocations = {};
        for (let location of userLocations) {
          const items = await getItems(location.id);  // Fetch items for each location
          
          // Ensure each item has the location_id assigned
          itemsForLocations[location.id] = items.map(item => ({
            ...item,
            location_id: location.id  // Assign location_id to each item
          }));
        }
        setAllItems(itemsForLocations);  // Store items for each location
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter locations based on the search query
    const filteredLoc = locations.filter((location) =>
      location.name.toLowerCase().includes(searchQuery) ||
      location.address.toLowerCase().includes(searchQuery)
    );
    setFilteredLocations(filteredLoc);

    // Filter items based on the search query
    const filteredItm = [];
    for (let location of locations) {
      const locationItems = allItems[location.id] || [];
      const matchingItems = locationItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery)
      );
      filteredItm.push(...matchingItems);
    }

    // Only set filteredItems if there's a search query, otherwise clear it
    if (searchQuery.trim()) {
      setFilteredItems(filteredItm);
    } else {
      setFilteredItems([]);  // Clear items if there's no search
    }
  }, [searchQuery, locations, allItems]);

  return (
    <div className="profile-container">
      <LogoutButton setIsSignedIn={setIsSignedIn} />
      <h1>Your Profile</h1>

      {/* Search Bar Component */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Render Filtered Locations */}
      <h2>Created Locations</h2>
      <ul>
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <LocationTile key={location.id} location={location} />
          ))
        ) : (
          <li>No matching locations found.</li>
        )}
      </ul>

      {/* Only render filtered items if there's a search query */}
      {searchQuery.trim() && (
        <>
          <h2>Items</h2>
          <ul>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                // Link to the item's detail page
                <li key={item.id}>
                  <Link to={`/locations/${item.location_id}/items/${item.id}`}>
                    {item.name}
                  </Link>
                </li>
              ))
            ) : (
              <li>No matching items found.</li>
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
