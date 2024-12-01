import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Question } from '../types/types';

import Car1 from '../images/car1.png';
import Car2 from '../images/car2.png';
import Car3 from '../images/car3.png';
import Car4 from '../images/car4.png';
import Car5 from '../images/car5.png';
import Car6 from '../images/car6.png';
import Car7 from '../images/car7.png';
import Car8 from '../images/car8.png';
import Logo from '../images/most_wanted.png';

const GamePage = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const navigate = useNavigate();

  // Array of image URLs for rotation inside the container
  const images = [ Car1, Car2, Car3, Car4, Car5, Car6, Car7, Car8 ];

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
    if (selectedAnswer) return;
    setSelectedAnswer(option);

    if (currentQuestion && option === currentQuestion[currentQuestion.correctAnswer]) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    if (currentQuestionIndex + 1 < (questions?.length || 0)) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      navigate('/results', { state: { score, totalQuestions: questions?.length || 0 } });
    }
  };

  if (error) {
    return <div className="text-center text-primary-yellow font-luckiest">{error}</div>;
  }

  if (!questions) {
    return <div className="text-center text-primary-yellow font-luckiest">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-black text-primary-yellow relative">
      {/* Top-left image (static) */}
      <img
        src={Logo}
        alt="Quiz Logo"
        className="absolute top-4 left-4 h-42 w-42 object-contain"
      />

      {/* Score in the top-right corner */}
      <div className="absolute top-4 right-4 text-xl font-bold font-luckiest">
        Score: {score}
      </div>

      <div className="p-6 bg-primary-yellow text-primary-black rounded-lg shadow-lg w-96">
        {/* Rotating image inside the container */}
        <img
          src={images[imageIndex]}
          alt="Car"
          className="w-full h-48 object-contain mb-4"
        />

        <h1 className="text-xl font-bold text-center font-luckiest">{currentQuestion?.question}</h1>
        <ul className="mt-4 space-y-2 font-luckiest">
          {['answerA', 'answerB', 'answerC', 'answerD'].map((key) => (
            <li
              key={key}
              className={`px-4 py-2 rounded cursor-pointer transition-all ${
                selectedAnswer
                  ? currentQuestion[currentQuestion.correctAnswer] === currentQuestion[key]
                    ? 'bg-primary-green text-white'
                    : selectedAnswer === currentQuestion[key]
                    ? 'bg-primary-red text-white'
                    : 'bg-gray-200'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => handleAnswerSelect(currentQuestion[key])}
            >
              {currentQuestion[key]}
            </li>
          ))}
        </ul>
        <button
          className="mt-6 px-6 py-2 w-full bg-primary-black text-primary-yellow rounded hover:bg-yellow-600 font-luckiest"
          onClick={nextQuestion}
          disabled={!selectedAnswer}
        >
          {currentQuestionIndex + 1 < (questions?.length || 0) ? 'Next Question' : 'View Results'}
        </button>
      </div>
    </div>
  );
};

export default GamePage;