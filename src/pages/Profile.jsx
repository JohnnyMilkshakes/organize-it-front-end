import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {getLocations, addLocation}  from '../services/locations';

const Profile = () => {
    const [locations, setLocations] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to show/hide the form
    const [newLocation, setNewLocation] = useState({ name: '', address: '' }); // State to track form input

    useEffect(() => {
        const loadLocations = async () => {
            const userLocations = await getLocations();
            setLocations(userLocations);
        };

        loadLocations();
    }, []);

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
        setNewLocation({ name: '', address: '' }); // Reset the form inputs
    };

    return (
        <div>
            <h1>Your Profile</h1>
            <h2>Created Locations</h2>
            <ul>
                {locations.length > 0 ? (
                    locations.map((location) => (
                        <li key={location.id}>
                            <Link to={`/locations/${location.id}`}>
                            {location.name} - {location.address}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>No locations found.</li>
                )}
            </ul>

            {/* Button to show the form */}
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add New Location'}
            </button>

            {/* Conditionally render the form */}
            {showForm && (
                <form onSubmit={handleFormSubmit}>
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
            )}
        </div>
    );
};

export default Profile;
