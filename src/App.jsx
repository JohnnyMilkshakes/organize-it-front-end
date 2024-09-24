import { Routes, Route } from "react-router-dom";
import Profile from "./pages/ProfileDisplay/Profile.jsx";
import Location from "./pages/LocationDisplay/Location.jsx";
import Item from "./pages/ItemDisplay/Item.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import { useEffect, useState } from "react";
import { getToken } from "./services/apiConfig.js";
import './App.css';

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
      {/* Landing Page */}
      <Route path="/" element={<LandingPage isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />} />
      
      {/* Profile Page */}
      <Route path="/profile" element={<Profile setIsSignedIn={setIsSignedIn} />} />
      
      {/* Location Page */}
      <Route path="/locations/:locationId" element={<Location setIsSignedIn={setIsSignedIn} />} />
      
      {/* Route to Item Page */}
      <Route path="/locations/:locationId/items/:itemId" element={<Item setIsSignedIn={setIsSignedIn} />} />
    </Routes>
  );
};

export default App;
