import React , { useContext } from 'react';
import { Routes,Route, Navigate } from 'react-router-dom'; // Make sure you have react-router-dom installed
//import { useAuthContext } from '../context/AuthContext';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    //const { isAuthenticated } = useAuthContext();
    const { authTokens } = useContext(AuthContext);

    return (
        <Routes>
        <Route
            {...rest}
            render={props =>
                authTokens ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login" /> // Adjust this path to your login route
                )
            }
        />
        </Routes>
    );
};

export default PrivateRoute;
