import React from 'react'
import { useParams } from 'react-router-dom'
function Location() {
    const {locationId} = useParams()
    if (!locationId) return <div>Loading...</div>;
  return (
      <div>
        <h1>{locationId}</h1>
      </div>
    );
  
}

export default Location