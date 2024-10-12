// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, FormControlLabel, Checkbox, Typography } from '@mui/material';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        is_active: true,
        is_staff: false,
        is_superuser: false,
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/SiteAccountManagementApp/api/register/', formData);
            setSuccessMessage('Registration successful!');
            setErrorMessage('');
            console.log(response.data);
             // Optionally reset the form
             setFormData({
                email: '',
                username: '',
                password: '',
                is_active: true,
                is_staff: false,
                is_superuser: false,
            });
        } catch (error) {
            setErrorMessage('Error during registration. Please try again.');
            setSuccessMessage('');
            console.error('Registration error:', error);
        }
    };

    return (
        <div>
            <Typography variant="h4">Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleChange}
                        />
                    }
                    label="Active"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="is_staff"
                            checked={formData.is_staff}
                            onChange={handleChange}
                        />
                    }
                    label="Staff"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="is_superuser"
                            checked={formData.is_superuser}
                            onChange={handleChange}
                        />
                    }
                    label="Superuser"
                />
                <Button type="submit" variant="contained" color="primary">
                    Register
                </Button>
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                {successMessage && <Typography color="primary">{successMessage}</Typography>}
            </form>
        </div>
    );
};

export default Register;
