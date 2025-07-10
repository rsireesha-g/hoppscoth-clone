
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Rest } from './pages/rest';
import { GraphQL } from './pages/graphql';
import { Realtime } from './pages/realtime';
import { Settings } from './pages/settings';
import { RealtimeSse } from './pages/realtimeSse';
import { RealtimeSocketio } from './pages/realtimeSocketio';
import { RealtimeMqtt } from './pages/realtimeMqtt';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rest />} />
        <Route path="/graphql" element={<GraphQL />} />
        <Route path="/realtime/websocket" element={<Realtime />} />
        <Route path="/realtime/sse" element={<RealtimeSse />} />
        <Route path="/realtime/socketio" element={<RealtimeSocketio />} />
        <Route path="/realtime/mqtt" element={<RealtimeMqtt />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
