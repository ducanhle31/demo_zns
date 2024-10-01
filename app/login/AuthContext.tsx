"use client";
import axios from "axios";
import Cookies from "js-cookie";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getToken: () => string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API = "https://zaloapp.ongdev.online/api/v1";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${API!}/auth/login`, {
      email,
      password,
    });
    const token = response.data?.token;

    if (token) {
      Cookies.set("token_app_zalo", token, { expires: 1 });
      setUser({ email, token });
    }
  };

  const logout = () => {
    Cookies.remove("token_app_zalo");
    setUser(null);
  };

  const getToken = () => {
    return Cookies.get("token_app_zalo");
  };

  useEffect(() => {
    const token = getToken();

    if (token) {
      setUser({ email: "hadn@aum.edu.vn", token });
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, getToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
