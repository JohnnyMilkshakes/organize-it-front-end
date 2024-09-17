import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLocations } from "../../services/locations";
import LocationForm from "../../components/LocationForm/LocationForm";

const Profile = () => {
  const [locations, setLocations] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to show/hide the form


  useEffect(() => {
    const loadLocations = async () => {
      const userLocations = await getLocations();
      setLocations(userLocations);
    };

    loadLocations();
  }, []);

  return (
    <div>
      <h1>Your Profile</h1>
      <h2>Created Locations</h2>
      <ul>
        {locations.length > 0 ? (
          locations.map((location) => (
            <li key={location.id}>
              <Link to={`/locations/${location.id}`}>
                {location.name} - {location.address}
              </Link>
            </li>
          ))
        ) : (
          <li>No locations found.</li>
        )}
      </ul>

      {/* Button to show the form */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New Location"}
      </button>

      {/* Conditionally render the form */}
      {showForm && <LocationForm setLocations={setLocations} setShowForm={setShowForm}/>}
    </div>
  );
};

export default Profile;
