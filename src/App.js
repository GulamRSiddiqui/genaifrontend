//import logo from './logo.svg';
import './App.css';
// eslint-disable-next-line
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import MenuBar from './components/MenuBar'
import FooterWithLogo from './components/FooterWithLogo'
import PrivateRoute from './utils/PrivateRoute'
import {AuthProvider} from './context/AuthContext'
import Upload from './pages/Upload'
import withAuth from './HOC/withAuth'; // Import the HOC
//npm install react-router-dom
//npm install axios
//npm install jwt-decode
//npm install @mui/material @emotion/react @emotion/styled
//npm install @mui/icons-material
//npm install geolib
function App() {
  return (
    <div className="App">
     <Router>
    
      <AuthProvider>
      <MenuBar />
      <Routes>
        <Route Component={LoginPage} path="/login" />
        <Route Component={withAuth(HomePage)}  path="/" />
        <Route Component={withAuth(Upload)}  path="/upload" /> {/* Wrap withAuth */}
        {/* Add more protected routes as needed */}
      </Routes>
    
      {/* <PrivateRoute Component={HomePage} path="/" exact></PrivateRoute>
      <PrivateRoute Component={LoginPage} path="/login" exact></PrivateRoute>
      <PrivateRoute Component={Upload} path="/upload" exact></PrivateRoute> */}
      {/* <Routes>
        <Route Component={LoginPage} path="/login"></Route>
      </Routes> */}
      </AuthProvider>
      <FooterWithLogo/>
     </Router>
    </div>
  );
}

export default App;
