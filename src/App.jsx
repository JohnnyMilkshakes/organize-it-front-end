import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpLogIn from './components/SignUpLogIn.jsx';
import Profile from './pages/ProfileDisplay/Profile.jsx'
import Location from './pages/LocationDisplay/Location.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpLogIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/locations/:locationId" element={<Location />} />
      </Routes>
    </Router>
  );
};

export default App;
