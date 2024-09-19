import { useEffect, useState } from "react";
import { getItem, updateItem, deleteItem } from "../../services/items.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function ItemEdit({
  locationId,
  itemId,
  setItem,
  showEditForm,
  setShowEditForm,
}) {
  const emptyForm = {
    name: "",
    description: "",
    quantity: 0,
    storage_area: "",
  };
  const [itemToUpdate, setItemToUpdate] = useState(emptyForm); // State to track form input
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchItem = async () => {
      const item = await getItem(locationId, itemId);
      setItemToUpdate(item);
    };
    fetchItem();
  }, [locationId, itemId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemToUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedItem = await updateItem(locationId, itemId, itemToUpdate);

    // Update the item in the parent state
    setItem(updatedItem);

    setShowEditForm(false); // Hide the form after submission
    setItemToUpdate(emptyForm); // Reset the form inputs
  };

  // Handle item deletion
  const handleDelete = async () => {
    await deleteItem(locationId, itemId);

    // Remove the deleted item from the items list (if applicable)
    setItem((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );

    // Navigate back to the item list page or another page after deletion
    navigate (`/locations/${locationId}`);// Adjust this route to match your item list display route
  };

  return (
    <li>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={itemToUpdate.name}
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
            value={itemToUpdate.description}
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
            value={itemToUpdate.quantity}
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
            value={itemToUpdate.storage_area}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => {
          setShowEditForm(!showEditForm);
        }}
      >
        Cancel
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default ItemEdit;

