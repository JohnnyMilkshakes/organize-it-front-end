import { useState, useEffect } from 'react';
import { getItem } from '../../services/items';  // Import getItems and editItem
import { useParams } from 'react-router-dom';

const Item = () => {
    const {locationId, itemId} = useParams()
    const [item, setItem] = useState(null);  // State for the selected item
    const [showEditForm, setShowEditForm] = useState(false);  // State to show/hide the edit form
    const [editedItem, setEditedItem] = useState({
        name: '',
        description: '',
        quantity: 0,
        storage_area: '',
    });  // State to track the form inputs for editing

    useEffect(() => {
        const fetchItem = async () => {
            const item = await getItem(locationId, itemId)
            setItem(item)
        }
        fetchItem()

    }, [locationId, itemId])

    // Handle form input changes for editing an item
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission to edit the item
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // await editItem(item.id, editedItem);  // Edit the item
            // Update the items list with the edited item
            // setItems((prevItems) => prevItems.map((item) =>
            //     item.id === item.id ? editedItem : item
            // ));
            // setSelectedItem(editedItem);  // Update the selected item with the new details
            setShowEditForm(false);  // Hide the form after submission
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };

    return (
        <div>

            {/* Show the selected item details */}
            {item ? (
                
                <div>
                    <h1>Displaying Item: {item.name}</h1>
                    <h2>Item Details</h2>
                    <p>Description: {item.description}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Storage Area: {item.storage_area}</p>

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
            ): <div>Loading</div>}
        </div>
    );
};

export default Item;
