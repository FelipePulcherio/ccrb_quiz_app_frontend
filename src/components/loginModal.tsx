import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { LoginResponse, CreateAccResponse } from "../types/types";

export default function LoginModal(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalPage, setModalPage] = useState<'login'|'createAcc'>('login')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [rePassword, setRePassword] = useState<string>('')

  const { login } = useAuth(); // Get the login function from authContext

  function cleanData(): void {
    setSuccess('');
    setError('');
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setRePassword('');
  }

  // Function used by the 'Login' button
  async function HandleLogin(e: React.FormEvent): Promise<void> {
    e.preventDefault();
  
    setError(''); // Reset error state
    setSuccess(''); // Reset success state
    console.log('Login attempt initiated.');
  
    try {
      // Send login request to backend
      const response = await axios.post<LoginResponse>('http://localhost:3000/login', 
        { email, password }
      );
  
      const { data, message } = response.data;
  
      // Validate response data
      if (response && data._id && data.first_name) {
        console.log('Login successful:', data);
        setSuccess("Login Successfull.");
  
        // Set user as logged in
        login({ id: data._id, name: data.first_name });

        setTimeout(() => {setIsOpen(false); setSuccess('')}, 1500);
  
      } else {
        // console.error('Invalid response format:', data);
      }

      // Set error state
      if (message != "Login successful.") {
        setError(message);
      }

    } catch (error: unknown) {
      // Network or server error
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
        // console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unknown error:', error);
      }
    } finally {
      console.log('Login attempt finished.');
    }
  }

  async function HandleCreateAcc(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    setError(''); // Reset error state
    setSuccess(''); // Reset success state
    
    if (password != rePassword) {
      setError("Passwords do not match.");
      return;
    }
    console.log('Create Acc attempt initiated.');
  
    try {
      // Send Create Acc request to backend
      const response = await axios.post<CreateAccResponse>('http://localhost:3000/user', 
        { email, password, number: phoneNumber, first_name: firstName, last_name: lastName }
      );
  
      const { data, message } = response.data;
  
      // Validate response data
      if (response && data._id && data.first_name) {
        console.log('Create Acc successful:', data);
        setSuccess("Account successfully created.");

        setTimeout(() => {setModalPage('login'); setSuccess('')}, 1500);
  
      } else {
        console.error('Invalid response format:', data);
      }

      // Set error state
      if (message != "Create account successful.") {
        setError(message);
      }

    } catch (error: unknown) {
      // Network or server error
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || error.message);
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unknown error:', error);
      }
    } finally {
      console.log('Create Acc attempt finished.');
    }
  }
  
  return (
    <>
    <button className="loginButton font-luckiest w-full bg-white text-black font-bold text-[1.2rem] px-[1.5rem] py-[1rem] rounded-lg text-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#E0E0E0] hover:scale-105 hover:duration-200 hover:transform " onClick={() => {setIsOpen(true); cleanData(); setModalPage('login')}}>Login</button>
      {isOpen && 
          <div 
            className="loginModal w-screen h-screen absolute top-0 left-0 right-0 bg-black bg-opacity-25 flex flex-col items-center justify-center" 
            onClick={() => setIsOpen(false)}
            >
              <div 
                className="loginPopUp relative w-[400px] h-min p-6 bg-white rounded-lg shadow-xl"
                onClick={e => e.stopPropagation()}
              >
                <div
                  id='closeButton'
                  className='closeButton absolute top-0 right-0 h-8 w-8 mt-2 mr-2 flex items-center justify-center'
                  onClick={() => setIsOpen(false)}
                >
                  <button className='group w-full h-full'>
                    <div className='grid justify-items-center gap-3.5'>
                      <span
                        className={`h-0.5 w-4/5 rounded-full bg-black rotate-45 translate-y-2 `}
                      ></span>
                      <span
                        className={`h-0.5 w-4/5 rounded-full bg-black -rotate-45 -translate-y-2`}
                      ></span>
                    </div>
                  </button>
                </div>
                {modalPage === 'login' ? ( success != '' ? <div className="success">{success}</div> :
                  (<form onSubmit={HandleLogin} className="form w-full flex flex-col items-start justify-center gap-8">
                    <div className="formTitle w-full text-lg font-bold text-gray-900 flex flex-row items-center justify-start mt-5">Login</div>
                    <div className="fieldContainer w-full flex flex-col items-start justify-center gap-4">
                      <div className="formField w-full flex flex-col items-start justify-center gap-3">
                        <label htmlFor="email" className="text-md font-medium text-gray-900">Email</label>
                        <input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email"
                          className="w-full text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-4 focus:ring-neutral-400" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="formField w-full flex flex-col items-start justify-center gap-2">
                        <label htmlFor="password" className="text-md font-medium text-gray-900">Password</label>
                        <input 
                          id="password" 
                          type="password" 
                          placeholder="Enter your password"
                          className="w-full text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-4 focus:ring-neutral-400" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {(error != '') && <div className="error text-sm text-red-600">{'*' + error}</div>}
                    </div>
                    <button 
                      type="submit" 
                      className="w-full text-sm font-medium text-white text-center bg-black rounded-lg px-5 py-2.5 hover:bg-opacity-80 focus:ring-4 focus:ring-neutral-400"
                    >
                      Login
                    </button>
                    <div className="text-black w-full text-sm mb-5">
                      {"Don't have an account? "}
                      <span 
                        className="text-blue-500 cursor-pointer hover:underline" 
                        onClick={() => setModalPage('createAcc')}
                      >
                        Create an account
                      </span>
                    </div>
                  </form>))
                  :
                  (success != '' ? <div className="success">{success}</div> : 
                    (<form onSubmit={HandleCreateAcc} className="form w-full flex flex-col items-start justify-center gap-8">
                      <div className="formTitle w-full text-lg font-bold text-gray-900 flex flex-row items-center justify-start mt-5">Create Account</div>
                      <div className="fieldContainer w-full flex flex-col items-start justify-center gap-4">
                        <div className="formField w-full flex flex-col items-start justify-center gap-3">
                          <label htmlFor="firstName" className="text-md font-medium text-gray-900">First Name</label>
                          <input 
                            id="firstName" 
                            type="text" 
                            placeholder="Enter your first name"
                            className="w-full text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-4 focus:ring-neutral-400" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="formField w-full flex flex-col items-start justify-center gap-3">
                          <label htmlFor="lastName" className="text-md font-medium text-gray-900">Last Name</label>
                          <input 
                            id="lastName" 
                            type="text" 
                            placeholder="Enter your last name"
                            className="w-full text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-4 focus:ring-neutral-400" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="formField w-full flex flex-col items-start justify-center gap-3">
                          <label htmlFor="phoneNumber" className="text-md font-medium text-gray-900">Phone Number</label>
                          <input  
                            id="phoneNumber" 
                            type="tel" 
                            placeholder="123-456-7890"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            className="w-full text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-4 focus:ring-neutral-400" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                        </div>
                        <div className="formField w-full flex flex-col items-start justify-center gap-3">
                          <label htmlFor="email" className="text-md font-medium text-gray-900">Email</label>
                          <input 
                            id="email" 
                            type="email" 
                            placeholder="Enter your email"
                            className="w-full text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-4 focus:ring-neutral-400" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="formField w-full flex flex-col items-start justify-center gap-2">
                          <label htmlFor="password" className="text-md font-medium text-gray-900">Password</label>
                          <input 
                            id="password" 
                            type="password" 
                            placeholder="Enter your password"
                            className="w-full text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-4 focus:ring-neutral-400" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="formField w-full flex flex-col items-start justify-center gap-2">
                          <label htmlFor="rePassword" className="text-md font-medium text-gray-900">Confirm Password</label>
                          <input 
                            id="rePassword" 
                            type="password" 
                            placeholder="Enter your password"
                            className="w-full text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-4 focus:ring-neutral-400" 
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            required
                          />
                        </div>
                        {(error != '') && <div className="error text-sm text-red-600">{'*' + error}</div>}
                      </div>
                      <button 
                        type="submit" 
                        className="w-full text-sm font-medium text-white text-center bg-black rounded-lg px-5 py-2.5 hover:bg-opacity-80 focus:ring-4 focus:ring-neutral-400"
                      >
                        Create Account
                      </button>
                      <div className="text-black w-full text-sm mb-5">
                        {"Already have an account? "}
                        <span 
                          className="text-blue-500 cursor-pointer hover:underline" 
                          onClick={() => setModalPage('login')}
                        >
                          Log in here
                        </span>
                      </div>
                    </form>)
                  )
                }
              </div>
          </div>
      }
    </>
  );
}