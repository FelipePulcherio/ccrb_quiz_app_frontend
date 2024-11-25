import React, { useEffect, useState } from 'react';
import './GamePage.css'; // Import styles

const GamePage = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3000/questions');
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError('Failed to load questions. Please try again later.');
      }
    };

    fetchQuestions();
  }, []);

  const currentQuestion = questions?.[currentQuestionIndex];

  const handleAnswerSelect = (option: string) => {
    if (selectedAnswer) return; // Prevent multiple selections

    setSelectedAnswer(option);

    if (currentQuestion && option === currentQuestion[currentQuestion.correctAnswer]) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex + 1 < (questions?.length || 0)) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!questions) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="game-container">
      <h1 className="game-question">{currentQuestion?.question}</h1>
      <ul className="options-list">
        {['answerA', 'answerB', 'answerC', 'answerD'].map((key) => (
          <li
            key={key}
            className={`option-item ${
              selectedAnswer === currentQuestion[key]
                ? currentQuestion[currentQuestion.correctAnswer] === currentQuestion[key]
                  ? 'correct'
                  : 'incorrect'
                : ''
            }`}
            onClick={() => handleAnswerSelect(currentQuestion[key])}
          >
            {currentQuestion[key]}
          </li>
        ))}
      </ul>
      <button
        className="next-button"
        onClick={nextQuestion}
        disabled={currentQuestionIndex + 1 >= (questions?.length || 0)}
      >
        Next Question
      </button>
      <div className="score-display">Score: {score}</div>
    </div>
  );
};

export default GamePage;