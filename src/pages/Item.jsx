import React, { useState, useEffect } from 'react';
import { getItems, updateItem } from '../services/items';  // Assume getItems fetches items and updateItem updates the item

const ItemsPage = () => {
    const [items, setItems] = useState([]);  // State for the list of items
    const [selectedItem, setSelectedItem] = useState(null);  // State for the selected item
    const [showEditForm, setShowEditForm] = useState(false);  // State to show/hide the edit form
    const [editedItem, setEditedItem] = useState({
        name: '',
        description: '',
        quantity: 0,
        storage_area: '',
    });  // State to track the form inputs for editing

    // Fetch items when the component mounts
    useEffect(() => {
        const loadItems = async () => {
            const fetchedItems = await getItems();  // Fetch items
            setItems(fetchedItems);
        };

        loadItems();
    }, []);

    // Handle clicking on an item to show its details
    const handleItemClick = (item) => {
        setSelectedItem(item);
        setEditedItem(item);  // Populate the form with the selected item details
        setShowEditForm(false);  // Hide the edit form until the edit button is clicked
    };

    // Handle form input changes for editing an item
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission to update the item
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateItem(selectedItem.id, editedItem);  // Update the item
            // Update the items list with the edited item
            setItems((prevItems) => prevItems.map((item) =>
                item.id === selectedItem.id ? editedItem : item
            ));
            setSelectedItem(editedItem);  // Update the selected item with the new details
            setShowEditForm(false);  // Hide the form after submission
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };

    return (
        <div>
            <h1>Your Items</h1>
            <ul>
                {items.length > 0 ? (
                    items.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => handleItemClick(item)}  // Clicking on an item shows its details
                            style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ddd', marginBottom: '10px' }}
                        >
                            {item.name}
                        </li>
                    ))
                ) : (
                    <li>No items found.</li>
                )}
            </ul>

            {/* Show the selected item details */}
            {selectedItem && (
                <div>
                    <h2>Item Details</h2>
                    <p>Name: {selectedItem.name}</p>
                    <p>Description: {selectedItem.description}</p>
                    <p>Quantity: {selectedItem.quantity}</p>
                    <p>Storage Area: {selectedItem.storage_area}</p>

                    {/* Button to toggle the edit form */}
                    <button onClick={() => setShowEditForm(!showEditForm)}>
                        {showEditForm ? 'Cancel' : 'Edit Item'}
                    </button>

                    {/* Conditionally render the form to edit the item */}
                    {showEditForm && (
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editedItem.name}
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
                                    value={editedItem.description}
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
                                    value={editedItem.quantity}
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
                                    value={editedItem.storage_area}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit">Update Item</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default ItemsPage;
