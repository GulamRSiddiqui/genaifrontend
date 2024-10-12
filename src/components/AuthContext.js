import { createContext, useState } from 'react';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(null);
    const [user, setUser] = useState(null);

    const loginUser = async (e) => {
        alert('in AuthContext')
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8001/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': e.target.email.value,
                    'password': e.target.password.value
                })
            });
            alert(`Response is ${response}` )

            // Check for HTTP response status
            if (!response.ok) {
                throw new Error('Login failed: ' + response.statusText);
            }

            const data = await response.json();
            setAuthTokens(data);
            alert(`Token is ${authTokens.refresh}` )
            console.log(authTokens.refresh)
            setUser(data.user); // Assuming the API returns user data
        } catch (error) {
            alert('Error: ' + error.message); // Alert user of the error
            console.error('Login error:', error);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
    };

    const ContextData = {
        loginUser,
        logoutUser,
        user,
        authTokens
    };

    return (
        <AuthContext.Provider value={ContextData}>
            {children}
        </AuthContext.Provider>
    );
};
