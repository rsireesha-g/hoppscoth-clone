
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Rest } from './pages/rest';
import { GraphQL } from './pages/graphql';
import { Realtime } from './pages/realtime';
import { Settings } from './pages/settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rest />} />
        <Route path="/graphql" element={<GraphQL />} />
        <Route path="/realtime" element={<Realtime />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
