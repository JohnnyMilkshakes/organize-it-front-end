import React, { useState, useEffect } from 'react';
import getLocations from '../services/locations';  // Service to get locations
import getItems from '../services/items';  // Service to get items for a location

const LocationPage = () => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);  // Track selected location
    const [items, setItems] = useState([]);  // Track items for selected location
    const [loading, setLoading] = useState(false);  // Track loading state
    const [error, setError] = useState(null);  // Track error state

    // Fetch locations when the component mounts
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await getLocations();
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
            const itemsData = await getItems(locationId);
            setItems(itemsData);
            setLoading(false);
        } catch (err) {
            setError('Failed to load items');
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Locations</h1>
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
        </div>
    );
};

export default LocationPage;
