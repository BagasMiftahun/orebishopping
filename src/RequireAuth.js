import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const token = localStorage.getItem("token"); // Get token from local storage

  const isTokenExpired = (token) => {
    if (!token) return true; // If no token, consider it expired

    const payload = JSON.parse(atob(token.split('.')[1])); // Extract payload from token
    return payload.exp * 1000 < Date.now(); // Check if expired
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/refresh-token`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store the new token
        return data.token; // Return new token
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
    return null; // If token refresh failed
  };

  useEffect(() => {
    const checkToken = async () => {
      if (isTokenExpired(token)) {
        setIsAuthorized(false);
      } else {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const timeUntilExpiry = payload.exp * 1000 - Date.now();

        if (timeUntilExpiry < 5 * 60 * 1000) { // If less than 5 minutes until expiry
          const newToken = await refreshToken();
          if (newToken) {
            const newPayload = JSON.parse(atob(newToken.split('.')[1]));
            setIsAuthorized(newPayload.exp * 1000 > Date.now());
          } else {
            setIsAuthorized(false);
          }
        } else {
          setIsAuthorized(true); // Token is still valid
        }
      }
      setIsLoading(false); // Set loading complete
    };

    checkToken();
  }, [token]);

  // Show loading or redirect if not ready
  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return isAuthorized ? children : <Navigate to="/signin" replace />;
};

export default RequireAuth;
