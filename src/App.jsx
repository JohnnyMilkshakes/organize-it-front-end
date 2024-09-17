import { useEffect, useState } from "react";
import { signIn } from "./services/auth";
import { getLocations, addLocation, getLocation } from "./services/locations";

const App = () => {
  const [user, setUser] = useState(null);
  // const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const homeJSON = await signIn({
        username: "testing",
        email: "testing@test.com",
        password: "testing",
      });
      setUser(homeJSON);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchLocation = async (id) => {
      const location = await getLocation(id);
      setLocation(location);
    };

    fetchLocation(1);
  }, [user]);

  // useEffect(() => {
  //   const fetchLocations = async () => {
  //     const locations = await getLocations();
  //     setLocations(locations);
  //   };

  //   fetchLocations();
  // }, [user]);

  // const createLocation = async () => {
  //   const newLocation = await addLocation({
  //     name: "TEST NAME",
  //     address: "TEST ADDRESS 123948",
  //   });
  //   setLocations((prevLocations) => [...prevLocations, newLocation]);
  // };

  // const handleAddLocation = () => {
  //   createLocation()
  // }

  return (
    <div>
      <h1>Hello home data!</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.username}!</h2>{" "}
          <p>Email: {user.email}</p>
          {location ? (
            <>
              <h2>Location, {location.name}!</h2>{" "}
              <p>Addy: {location.address}</p>
              <p>id: {location.id}</p>
            </>
          ) : (
            <p>Loading Location data...</p>
          )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default App;
