import { createContext,useContext, useState,useEffect } from 'react';
import axios from 'axios';
import { verifyToken,refreshToken,getUserFromToken } from '../utils/authUtils';
//import jwt_decode from 'jwt-decode'; // Import jwt-decode
import { jwtDecode } from 'jwt-decode'; // Correct import
//import { useAuth } from './useAuth';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('access_token') || null);
    // const [refreshTokens, setRefreshTokens] = useState(localStorage.getItem('refresh_token') || null);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const checkLogin = async () => {
        alert("I'm from useEffect");
        const accessToken = localStorage.getItem('access_token');
    
        if (accessToken) {
          const isValid = await verifyToken(accessToken);
          if (isValid) {
            // If the access token is valid, set the user data
            const decodedUser = getUserFromToken(accessToken);
            setUser(decodedUser);
          } else {
            // If the access token is not valid, try to refresh it
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              try{
              const newAccessToken = await refreshToken(refreshToken);
              if (newAccessToken) {
                // If the refresh is successful, update the access token
                setAuthTokens(newAccessToken);
                const decodedUser = getUserFromToken(newAccessToken);
                setUser(decodedUser);
              } else {
                // If the refresh fails, clear the tokens
                logoutUser(); // Assuming you have a logoutUser function to handle this
              }
            }catch(error){
              console.error('Error refreshing token:', error);
              logoutUser();
            }
            } else {
              // If no refresh token is available, log out the user
              logoutUser();
            }
          }
        } else {
          // If no access token is available, log out the user
          logoutUser();
        }
      };
    
      checkLogin();
    }, [authTokens]); // Ensure that you add dependencies correctly

    
    const loginUser = async (e) => {
        e.preventDefault();
        alert('Login button clicked');
    
    // Check if the access token already exists
    //const accessToken = localStorage.getItem('access_token');
    // alert(`Login Access token exists: ${authTokens}`);
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && await verifyToken(accessToken)) {
        // If the access token exists, decode it to get user data
        console.log("user is already authenticated")
        alert(`User ${user.username}`)
        window.location.href = '/';
        // Optionally, you could redirect the user or show a message
        return; // Exit the function if the user is already authenticated
    }
        try {
            const response = await axios({
                method: 'post', // Specify the method
                url: 'http://127.0.0.1:8001/api/token/',
                data: {
                    email: e.target.email.value, // Use 'email' for the field
                    password: e.target.password.value
                },
                headers: {
                    'Content-Type': 'application/json' // Set Content-Type header
                }
            });
            // Check if the response status is 200
        if (response.status === 200) {
          const { access, refresh } = response.data.token;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            // alert(`${access} ----- ${refresh}`)  
            console.log(response.data)
            console.log(response.data.token.access)
            console.log(response.data.user.username)
            alert(`User ${response.data}`)
            // Set the auth tokens
            setAuthTokens(response.data.token.access);
            // Decode the access token to get user data
            const decodedUser = jwtDecode(access);
            setUser(decodedUser); // Set user data from the decoded token
            console.log(decodedUser.username);
        } else {
            console.error('Unexpected response status:', response.status);
            alert( `Unexpected response status ${response.status}`)
            // Handle unexpected status codes
        }
        } catch (error) {
            const errorMessage = error.response ? error.response.data.detail : 'An error occurred';
            alert(`Error: ${errorMessage}`);
            console.error('Login error:', error);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
    };


    
    // const verifyToken = async (token) => {
    //   alert('verifyToken called');
    //     try {
    //       const response = await axios.post('http://127.0.0.1:8001/api/token/verify/', {
    //         token: token,
    //       });
    
    //       if (response.status === 200) {
    //         // Token is valid, refresh it
    //         const refreshResponse = await axios.post('http://127.0.0.1:8001/api/token/refresh/', {
    //           refresh: localStorage.getItem('refresh_token'),
    //         });
    
    //         if (refreshResponse.status === 200) {
    //           const { access } = refreshResponse.data.token;
    //           setAuthTokens(access);
    //           const decodedUser = jwtDecode(access);
    //           setUser(decodedUser);
    //         }
    //       }
    //     } catch (error) {
    //       console.error('Token is invalid or refresh failed', error);
    //       logoutUser(); // Optionally logout if token verification fails
    //     }
    //   };
    
      // Check if the access token exists in localStorage


    
    // Object containing authentication-related functions and state
    const ContextData = {
        loginUser,
        logoutUser,
        user,
        authTokens,
        setAuthTokens,
        setUser,
        refreshToken,
        verifyToken,

     
      };

    // const ContextData = {
    //     loginUser,
    //     logoutUser,
    //     user,
    //     authTokens
    // };

    return (
        <AuthContext.Provider value={ContextData}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Provides access to the AuthContext, which contains the loginUser, logoutUser, user, and authTokens properties.
 * @returns {Object} The AuthContext object.
 */
export const useAuthContext = () => {
    return useContext(AuthContext);
};