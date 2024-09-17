import React, { useState, useEffect } from "react";
import { getLocation } from "../services/locations"; // Service to get locations
import { getItems, addItem } from "../services/items"; // Service to get items for a location
import { useParams } from "react-router-dom";

const Location = () => {
  const [location, setLocation] = useState(null);
  const {locationId} = useParams()
  const [items, setItems] = useState([]); // Track items for selected location
  const [showForm, setShowForm] = useState(false); // Show/hide the add item form
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    quantity: 0,
    storage_area: "",
  }); // Track new item details

  // Fetch locations when the component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocation(locationId); 
        setLocation(data);
      } catch (err) {
        console.log("Failed to load locations", err);
      }
    };
    fetchLocations();
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

  // Handle form input changes for the new item
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to add a new item
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem(locationId, newItem); // Add item to the selected location
      // Refresh items list after adding
      const updatedItems = await getItems(locationId);
      setItems(updatedItems);
      setShowForm(false); // Hide the form after submission
      setNewItem({ name: "", description: "", quantity: 0, storage_area: "" }); // Reset form
    } catch (err) {
      console.log("Failed to add item", err);
    }
  };

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
      {locationId  && items.length > 0 && (
        <div>
          <h2>Items</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Storage Area: {item.storage_area}</p>
              </li>
            ))}
          </ul>
        </div>
      )} 

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <h3>Add New Item</h3>
          <div>
            <label htmlFor="name">Item Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newItem.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="storage_area">Storage Area:</label>
            <input
              type="text"
              id="storage_area"
              name="storage_area"
              value={newItem.storage_area}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Location;
