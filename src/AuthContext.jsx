import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  // Send credentials to the API o receive token.
  const signup = async (credenials) => {
    try {
      const response = await fetch(API + "/signup", {
        method: "POST",
        headers: { "Content-Type": "applicationjson" },
        body: JSON.stringify(credenials),
      });
      const result = await response.json();
      setToken(result.token);
      setLocation("TABLET");
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: authenticate
  // Send token to API to authenticate user
  const authenticate = async () => {
    try {
      if (!token) throw Error("No token found.");
      const response = await fetch(API + "/authenticate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw Error("Authentication failed.");
      setLocation("Tunnel");
    } catch (error) {
      console.error(error);
    }
  };

  const value = { location };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
