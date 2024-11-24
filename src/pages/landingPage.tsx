import axios from "axios";

export default function LandingPage(): JSX.Element {
  function FetchTest() {
    axios.get('http://127.0.0.1:3000/users')
      .then(response => {
        console.log(response.data);
      }, error => {
        console.log(error);
      });
  }

  return (
    <>
      <div>LANDING PAGE</div>
      <button onClick={() => FetchTest()} className="border-2 border-[#000000]">Fetch</button>
    </>
  );
}
