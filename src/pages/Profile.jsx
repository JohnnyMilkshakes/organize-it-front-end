import React, { useState, useEffect } from 'react';
import fetchUserLocations from '../services/locations';

const Profile = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const loadLocations = async () => {
            const userLocations = await fetchUserLocations();
            setLocations(userLocations);
        };

        loadLocations();
    }, []);

    return (
        <div>
            <h1>Your Profile</h1>
            <h2>Created Locations</h2>
            <ul>
                {locations.length > 0 ? (
                    locations.map((location) => (
                        <li key={location.id}>
                            {location.name} - {location.address_line}
                        </li>
                    ))
                ) : (
                    <li>No locations found.</li>
                )}
            </ul>
        </div>
    );
};

export default Profile;