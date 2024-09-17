import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpLogIn from './components/SignUpLogIn.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpLogIn />} />
      </Routes>
    </Router>
  );
};

export default App;
