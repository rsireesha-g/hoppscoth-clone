
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Rest } from './pages/rest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
