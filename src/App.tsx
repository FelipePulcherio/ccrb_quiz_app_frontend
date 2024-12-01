import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import GamePage from './pages/gamePage';
import ResultsPage from './pages/ResultsPage';
import PlayerPage from './pages/playerPage';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="player" element={<PlayerPage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}