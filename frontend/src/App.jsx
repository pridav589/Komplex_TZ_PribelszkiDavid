import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Felvettek from './pages/Felvettek.jsx';

function App() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/felvettek" element={<Felvettek />} />
        </Routes>
    </div>
  );
}

export default App;