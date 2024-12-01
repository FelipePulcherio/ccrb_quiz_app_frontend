import { createContext, useState, ReactNode } from 'react';
import { Player } from '../types/types';

// Define the AuthContext interface
interface AuthContextType {
  isLoggedIn: boolean;
  user: Player | null;
  login: (userInfo: Player) => void;
  logout: () => void;
}

// Create the context with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Player | null>(null);

  const login = (userInfo: Player) => {
    setIsLoggedIn(true);
    setUser(userInfo);
    console.log(userInfo);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;