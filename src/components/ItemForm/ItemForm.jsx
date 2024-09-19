import { addItem, getItems, deleteItem } from "../../services/items";
import { useState } from "react";

function ItemForm({ locationId, setItems, setShowForm }) {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    quantity: 0,
    storage_area: "",
  }); // Track new item details

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
    <>
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
    </>
  );
}

export default ItemForm;
