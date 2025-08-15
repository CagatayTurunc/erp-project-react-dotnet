import React, { useState } from 'react';
import { Avatar, Typography, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { brown, deepOrange, orange } from '@mui/material/colors';

import AuthLayout from '../../layout/AuthLayout';
import LoginForm from '../../form/LoginForm';

export default function Login() {
 
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await login({ email: form.email, password: form.password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.';
  setError(errorMessage);
    }
  };

  return (
    <AuthLayout>
      <Avatar sx={{ m: 1, bgcolor: deepOrange['A400'] }}>
        <AccountCircleIcon fontSize="large" />
      </Avatar> 
      <Typography component="h1" variant="h5" gutterBottom>
        Hoşgeldiniz
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={1}>
        Devam etmek için giriş yapınız
      </Typography>

      {error && <Alert severity="error" sx={{ width: '100%', mt: 1 }}>{error}</Alert>}

      <LoginForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        navigate={navigate}
      />
    </AuthLayout>
  );
}