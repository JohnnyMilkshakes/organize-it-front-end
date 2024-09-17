import React, { useState, useEffect } from 'react';
import getLocations from '../services/locations';  // Service to get locations
import getItems from '../services/items';  // Service to get items for a location
import addItem from '../services/addItem';  // Service to add an item to a location

const LocationPage = () => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);  // Track selected location
    const [items, setItems] = useState([]);  // Track items for selected location
    const [loading, setLoading] = useState(false);  // Track loading state
    const [error, setError] = useState(null);  // Track error state
    const [showForm, setShowForm] = useState(false);  // Show/hide the add item form
    const [newItem, setNewItem] = useState({ name: '', description: '', quantity: 0, storage_area: '' });  // Track new item details

    // Fetch locations when the component mounts
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await getLocations();  // This will include the user's token in the request
                setLocations(data);
            } catch (err) {
                setError('Failed to load locations');
            }
        };
        fetchLocations();
    }, []);

    // Handle location click to fetch items
    const handleLocationClick = async (locationId) => {
        setSelectedLocation(locationId);
        setLoading(true);
        try {
            const itemsData = await getItems(locationId);  // Fetch items for the selected location
            setItems(itemsData);
            setLoading(false);
        } catch (err) {
            setError('Failed to load items');
            setLoading(false);
        }
    };

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
            await addItem(selectedLocation, newItem);  // Add item to the selected location
            // Refresh items list after adding
            const updatedItems = await getItems(selectedLocation);
            setItems(updatedItems);
            setShowForm(false);  // Hide the form after submission
            setNewItem({ name: '', description: '', quantity: 0, storage_area: '' });  // Reset form
        } catch (err) {
            setError('Failed to add item');
        }
    };

    return (
        <div>
            <h1>Your Locations</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div className="location-list">
                {locations.map((location) => (
                    <div
                        key={location.id}
                        className="location-item"
                        onClick={() => handleLocationClick(location.id)}  // Set onClick event to load items
                        style={{ cursor: 'pointer', marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}
                    >
                        <h2>{location.name}</h2>
                        <p>{location.address}</p>
                    </div>
                ))}
            </div>

            {loading && <p>Loading items...</p>}

            {/* Display items for the selected location */}
            {selectedLocation && !loading && items.length > 0 && (
                <div>
                    <h2>Items for Location {selectedLocation}</h2>
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

            {!loading && selectedLocation && items.length === 0 && (
                <p>No items available for this location.</p>
            )}

            {/* Button to show the Add Item form */}
            {selectedLocation && (
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Item'}
                </button>
            )}

            {/* Add Item form */}
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

export default LocationPage;
