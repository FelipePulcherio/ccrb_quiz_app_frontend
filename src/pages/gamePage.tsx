import React, { useEffect, useState } from 'react';

const GamePage = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null); // New state for error messages

  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/questions');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions. Please try again later.');
      }
    };

    fetchQuestions();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>; // Show error message
  }

  if (!questions) {
    return <div>Loading...</div>; // Loading state
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1>{currentQuestion.question}</h1>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => setSelectedAnswer(option)}>
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GamePage;

