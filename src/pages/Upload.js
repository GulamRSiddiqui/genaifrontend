import React, { useState,useEffect,useContext } from 'react'
import { Button, Container, Typography, Box, CircularProgress } from '@mui/material'
import axios from 'axios'
import AuthContext from '../context/AuthContext';
import { verifyToken } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { extractFirstPlace } from '../utils/extractPlace';
import DistanceCalculator from '../components/DistanceCalculator';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const { loginUser, authTokens, user } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const [place, setPlace] = useState(null)


  const checkLogin = async () => {
    const authTokens = localStorage.getItem('access_token');
    if (authTokens) {
      const isValid = await verifyToken(authTokens);
      if (!isValid) {
        localStorage.removeItem('access_token');
        navigate('/login'); // Redirect to login if token is invalid
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);


  // useEffect(() => {
        
  //   const authTokens = localStorage.getItem('access_token');
  //   // alert(`777777777 this is form Upload Page ${authTokens}`);
  //   const checkLogin = async () => {
  //     if (authTokens) {
  //       const isValid= await verifyToken(authTokens)
  //       if (!isValid) {
  //       localStorage.removeItem('access_token');
  //       navigate('/login'); // Redirect to home if token is valid
  //       }
  //     }
  //   };
  //   checkLogin();
  // }, [authTokens, navigate]);




  const handleFileChange = (event) => {
   
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = async () => {
    
    await checkLogin();

    if (!selectedFile) {
      alert('Please select a file first!')
      return
    }

    const formData = new FormData()
    formData.append('image', selectedFile,selectedFile.name)

    setIsLoading(true)

    try {
      const accessToken = localStorage.getItem('access_token'); // Assuming you store the token in localStorage
      const response = await axios.post("http://127.0.0.1:8001/api/Places", formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Update with your token
          'Content-Type': 'multipart/form-data'
        }
      });

      setResponse(response.data)
      console.log(response.data)
      setPlace(extractFirstPlace(response.data))
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file. Please try again.')
      const authTokens = localStorage.getItem('access_token');
      if (!authTokens) {
        localStorage.removeItem('access_token');
        navigate('/login');
      }
    
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload Image
        </Typography>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Select Image
          </Button>
        </label>
        {selectedFile && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Selected file: {selectedFile.name}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
        {response && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="h6">Response:</Typography>
            {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
            <div>Place Name : {place}</div>
            <div> {place && <DistanceCalculator selectedPlace={place} />}</div>
            <div dangerouslySetInnerHTML={{ __html: response }} />

          </Box>
        )}
      </Box>
    </Container>
  )
}

export default Upload