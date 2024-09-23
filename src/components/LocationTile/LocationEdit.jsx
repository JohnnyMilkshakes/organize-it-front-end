import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocation, updateLocation, deleteLocation } from "../../services/locations";

function LocationEdit({ locationId, setLocations, showEdit, setShowEdit }) {
  const [locationToUpdate, setLocationToUpdate] = useState({ name: "", address: "" });
  const [isLoading, setIsLoading] = useState(false); // To manage loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getLocation(locationId);
        setLocationToUpdate(location);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    fetchLocation();
  }, [locationId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocationToUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Disable form while submitting
    try {
      const updatedLocation = await updateLocation(locationId, locationToUpdate);

      if (updatedLocation) {
        // Update the location in the array
        setLocations((prevLocations) =>
          prevLocations.map((location) =>
            location.id === updatedLocation.id ? updatedLocation : location
          )
        );
        setShowEdit(false); // Hide the form after submission
      }
    } catch (error) {
      console.error("Failed to update location:", error);
    } finally {
      setIsLoading(false); // Re-enable form
    }
  };

  // Handle deletion
  const handleDelete = async () => {
    setIsLoading(true); // Disable buttons while deleting
    try {
      await deleteLocation(locationId);

      // Remove the deleted location from the state
      setLocations((prevLocations) =>
        prevLocations.filter((location) => location.id !== locationId)
      );

      // Redirect to profile page after deletion
      navigate("/profile");
    } catch (error) {
      console.error("Failed to delete location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Location Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={locationToUpdate.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={locationToUpdate.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading} className="location-submit">
          {isLoading ? "Updating..." : "Submit"}
        </button>
      </form>
      <button
        onClick={() => setShowEdit(!showEdit)}
        className="location-cancel"
        disabled={isLoading}
      >
        Cancel
      </button>
      <button className="location-delete" onClick={handleDelete} disabled={isLoading}>
        {isLoading ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
}

export default LocationEdit;
