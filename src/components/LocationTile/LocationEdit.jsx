import { useEffect, useState } from "react";
import { getLocation, updateLocation } from "../../services/locations";

function LocationEdit({ locationId, setLocations, showEdit, setShowEdit }) {
  const [locationToUpdate, setLocationToUpdate] = useState({
    name: "",
    address: "",
  }); // State to track form input

  useEffect(() => {
    const fetchLocation = async () => {
      setLocationToUpdate(await getLocation(locationId));
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
    const updatedLocation = await updateLocation(locationId, locationToUpdate); 

    // Update the location in the array
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === updatedLocation.id ? updatedLocation : location
      )
    );

    setShowEdit(false); // Hide the form after submission
    setLocationToUpdate({ name: "", address: "" }); // Reset the form inputs
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
        <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => {
          setShowEdit(!showEdit);
        }}
      >
        Cancel
      </button>
      <button>Delete</button>
    </li>
  );
}

export default LocationEdit;
