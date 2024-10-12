import React, { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import verifyToken,{ refreshToken,  getUserFromToken } from '../utils/authUtils';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { authTokens, verifyToken, refreshToken, setUser } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
      const checkToken = async () => {
        if (authTokens) {
          const isValid = await verifyToken(authTokens);
          if (!isValid) {
            const refreshTokenValue = localStorage.getItem('refresh_token');
            if (refreshTokenValue) {
              const newAccessToken = await refreshToken(refreshTokenValue);
              if (!newAccessToken) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate('/login'); // Redirect to login if refresh fails
              } else {
                // Optionally update user info with the new token
                const decodedUser = getUserFromToken(newAccessToken);
                setUser(decodedUser);
              }
            } else {
              navigate('/login'); // Redirect to login if no refresh token
            }
          } else {
            // If the token is valid, set the user data
            const decodedUser = getUserFromToken(authTokens);
            setUser(decodedUser);
          }
        } else {
          navigate('/login'); // Redirect to login if no access token
        }
      };

      checkToken();
    }, [authTokens, navigate, verifyToken, refreshToken, setUser]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
