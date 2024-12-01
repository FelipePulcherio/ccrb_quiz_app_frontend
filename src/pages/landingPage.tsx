import LoginModal from "../components/loginModal";
import { useNavigate } from "react-router-dom";

export default function LandingPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <div>LANDING PAGE</div>
      <LoginModal />
      <button onClick={() => navigate('/game')}>Play</button>
    </>
  );
}
