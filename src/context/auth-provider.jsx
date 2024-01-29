/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function retrieveStoredToken() {
  const storedToken = sessionStorage.getItem("userToken");
  return {
    token: storedToken,
  };
}

export const AuthProvider = ({ children }) => {
  const storedToken = retrieveStoredToken();
  const initialToken = storedToken.token || "";
  const [accessToken, setAccessToken] = useState(initialToken);
  const [userPayload, setUserPayload] = useState(null);
  const isLoggedIn = !!accessToken;

  useEffect(() => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      setUserPayload(decoded);
    } else {
      setUserPayload(null);
    }
  }, [accessToken]);
  // console.log(userPayload);

  return <AuthContext.Provider value={{ isLoggedIn, accessToken, setAccessToken, userPayload }}>{children}</AuthContext.Provider>;
};
