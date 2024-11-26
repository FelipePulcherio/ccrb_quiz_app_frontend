import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const { score, totalQuestions } = location.state as { score: number; totalQuestions: number };

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-black text-primary-yellow">
      <div className="p-8 bg-primary-yellow text-primary-black rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Quiz Results</h1>
        <p className="mt-4 text-lg text-center">
          You answered <span className="font-bold">{score}</span> out of{' '}
          <span className="font-bold">{totalQuestions}</span> questions correctly.
        </p>
        <p className="mt-2 text-lg text-center">
          Your score: <span className="font-bold">{percentage}%</span>
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-primary-black text-primary-yellow rounded hover:bg-yellow-600"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;