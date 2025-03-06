import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.jsx';
import Index from './pages/Index.jsx';
import Felvettek from './pages/Felvettek.jsx';

function App() {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="bg-torzs py-4">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/felvettek" element={<Felvettek />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;