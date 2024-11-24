// export default function LandingPage(): JSX.Element {
//   return (
//     <>
//       <div>LANDING PAGE</div>
//     </>
//   );
// }
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Welcome to the Car Quiz!</h1>
      <button
        onClick={() => navigate('/game')}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default LandingPage;