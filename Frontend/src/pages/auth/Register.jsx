import React, { useState } from 'react';
import { Avatar, Typography,Alert } from '@mui/material'; // Alert'ü şimdilik kaldırıyoruz
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { register } from '../../services/authService'; // İsmin 'register' olduğunu varsayıyorum
import { useNavigate } from 'react-router-dom';
import { deepOrange } from '@mui/material/colors';

import AuthLayout from '../../layout/AuthLayout';
import RegisterForm from '../../form/RegisterForm'; // Dosya yolunuzu kontrol edin

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // Hata state'ini string'den nesneye çeviriyoruz
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({}); // Her denemede eski hataları temizle

    try {
      await register(form); // authService içindeki fonksiyonunuz
      
      // Başarı durumunda doğrudan yönlendirme yapabiliriz.
      // Dilerseniz success mesajı için ayrı bir state de tutabilirsiniz.
      navigate('/login');

    } catch (err) {
      console.error("Register Hatası:", err.response); // Hata detayını logla

      if (err.response && err.response.status === 400) {
        // FluentValidation'dan gelen 400 hatası
        const validationErrors = err.response.data.errors;
        const formattedErrors = {};

        for (const field in validationErrors) {
          // Gelen alan adını (örn: "FirstName") küçük harfe çeviriyoruz
          formattedErrors[field.toLowerCase()] = validationErrors[field][0];
        }
        setErrors(formattedErrors);
      } else {
        // Diğer genel hatalar (500 vb.)
        setErrors({ general: err.response?.data?.message || 'Bir sunucu hatası oluştu.' });
      }
    }
  };

  return (
    <AuthLayout>
      <Avatar sx={{ m: 1, bgcolor: deepOrange['A400'] }}>
        <AccountCircleIcon fontSize="large" />
      </Avatar> 
      <Typography component="h1" variant="h5" gutterBottom>
        Hesap Oluştur
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={1}>
        Devam etmek için bilgilerinizi giriniz
      </Typography>

      {/* Genel hataları göstermek için bir Alert kullanabiliriz */}
      {errors.general && (
        <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
          {errors.general}
        </Alert>
      )}

      <RegisterForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        navigate={navigate}
        errors={errors} // Yeni 'errors' nesnesini props olarak geçiyoruz
      />
    </AuthLayout>
  );
}