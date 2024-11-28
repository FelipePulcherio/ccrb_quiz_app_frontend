import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import LandingPage from './pages/landingPage';
import GamePage from './pages/gamePage';

export default function App() {
    // Call contexts
    const { isLoggedIn } = useAuth(); // Access the logged-in state from context

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route
          path='game'
          element={isLoggedIn ? <GamePage /> : <Navigate to='/' />}
        />
        {/* Non-existing routes */}
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}
