import { useState } from "react";
import { Link } from "react-router-dom";
import LocationEdit from "./LocationEdit";
function LocationTile({ setLocations,location }) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      {!showEdit ? (
        <li>
          <Link to={`/locations/${location.id}`}>
            <div>
              <h3>{location.name}</h3>
              <p>{location.address}</p>
            </div>
          </Link>
          <button onClick={() => setShowEdit(!showEdit)}>Edit</button>
        </li>
      ) : (
        <LocationEdit
          locationId={location.id}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          setLocations={setLocations}
        />
      )}
    </>
  );
}

export default LocationTile;
