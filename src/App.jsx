import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
    <Router>
      {isSignedIn ? <Navigate to="/profile" replace /> : null}
      <Routes>
        <Route path="/" element={<LandingPage setIsSignedIn={setIsSignedIn} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/locations/:locationId" element={<Location />} />
        <Route path="/locations/:locationId/items/:itemId" element={<Item />} />
      </Routes>
    </Router>
  );
};

export default App;
