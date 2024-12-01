import { useState, useEffect, useRef } from "react";
import LoginModal from "../components/loginModal";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CarMain from "../images/carMain.png";
import ProfileIMg from "../images/profile.png";
import Audio from "../sounds/titanium-170190.mp3"
import "./landingPage.css"; 

export default function LandingPage(): JSX.Element {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");
  const [volume, setVolume] = useState<number>(1); 
  const [popupMessage, setPopupMessage] = useState<string | null>(null); 
  const audioRef = useRef<HTMLAudioElement | null>(null); 
  
  const { isLoggedIn } = useAuth(); // Access the logged-in state from context
  const navigate = useNavigate();

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume; 
    }
  };

  const handlePopup = (message: string) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 2000); 
  };

  const date = currentTime ? currentTime.toLocaleDateString() : "";
  const time = currentTime ? currentTime.toLocaleTimeString() : "";

  useEffect(() => {
    const handlePlayAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn("Audio autoplay blocked. User interaction required.", err);
        });
      }
    };

    // Add event listener to ensure autoplay after user interaction
    document.addEventListener("click", handlePlayAudio, { once: true });

    return () => {
      document.removeEventListener("click", handlePlayAudio);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    // <>
    //   <div>LANDING PAGE</div>
    //   <LoginModal />
    //   <button onClick={() => navigate('/game')}>Play</button>
    // </>
    <div className="landing-page">
      {/* Music */}
      <audio ref={audioRef} autoPlay loop>
        <source src={Audio} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Popup */}
      {popupMessage && <div className="popup">{popupMessage}</div>}

      {/* Header */}
      <header className="header">
        <h1 className="title">THE MOST WANTED</h1>
        <div className="stars">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="star">
              ★
            </span>
          ))}
        </div>
      </header>

      {/* Profile Icon FOR FUTURE LOGIN */}
      {isLoggedIn && <div
        className="profile-icon"
        onClick={() => handlePopup("You are logged in!")}
      >
        <img src={ProfileIMg} alt="Profile" />
      </div>}

      {/* Car Image */}
      <div className="car-image">
        <img src={CarMain} alt="Car" />
      </div>

      {/* Buttons */}
      <div className="buttons">
        {isLoggedIn ? 
          (<button onClick={() => navigate('/game')} className="btn">
            Start Quiz ▶
          </button>) 
          :
          (<LoginModal />) 
        }
        <button
          className="btn"
          onClick={() => handlePopup("Coming soon in future updates")}
        >
          Leader Board
        </button>
        <button
          className="btn"
          onClick={() => handlePopup("Coming soon in future updates")}
        >
          Multiplayer
        </button>
        <button
          className="btn"
          onClick={() => handlePopup("Coming soon in future updates")}
        >
          Settings
        </button>
      </div>

      {/* Volume Control */}
      <div className="volume-control">
        <label htmlFor="volume-slider">Volume: </label>
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>

      {/* TIMER AND DATE */}
      <footer className="footer">
        {error && <div className="error">{error}</div>}
        <div className="timer">
          <div className="date-box">{date}</div>
          <div className="time-box">{time}</div>
        </div>
      </footer>
  </div>
  );
}
