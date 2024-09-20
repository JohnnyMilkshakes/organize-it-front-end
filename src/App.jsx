import { Routes, Route} from "react-router-dom";
import Profile from "./pages/ProfileDisplay/Profile.jsx";
import Location from "./pages/LocationDisplay/Location.jsx";
import Item from "./pages/ItemDisplay/Item.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import { useEffect, useState } from "react";
import { getToken } from "./services/apiConfig.js";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkSignedIn = async () => {
      const token = await getToken();
      if (token) {
        setIsSignedIn(true);
      }
    };
    checkSignedIn();
  }, []);

  return (
    <Routes>
      <>
        <Route
          path="/"
          element={<LandingPage isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />}
        />
        <Route path="/profile" element={<Profile setIsSignedIn={setIsSignedIn} />} />
        <Route path="/locations/:locationId" element={<Location setIsSignedIn={setIsSignedIn} />} />
        <Route path="/locations/:locationId/items/:itemId" element={<Item setIsSignedIn={setIsSignedIn} />} />
      </>
    </Routes>
  );
};

export default App;
