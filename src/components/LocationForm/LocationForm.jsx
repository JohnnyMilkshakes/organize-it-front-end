import { useState } from "react";
import { addLocation } from "../../services/locations";
function LocationForm({ setLocations, setShowForm }) {
  const [newLocation, setNewLocation] = useState({ name: "", address: "" }); // State to track form input

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const addedLocation = await addLocation(newLocation); // Call the API to add the location
    setLocations((prevLocations) => [...prevLocations, addedLocation]); // Add the new location to the list
    setShowForm(false); // Hide the form after submission
    setNewLocation({ name: "", address: "" }); // Reset the form inputs
  };
  return (
    <div className="modal-overlay">
      <div className="add-new-location">
        <button className="close-button" onClick={() => setShowForm(false)}>
          X
        </button>
        <form className="location-form" onSubmit={handleFormSubmit}>
          <h3>Add New Location</h3>
          <div>
            <label htmlFor="name">Location Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newLocation.name}
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
              value={newLocation.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default LocationForm;
