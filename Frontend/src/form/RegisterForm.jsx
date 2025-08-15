import React from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { grey, teal } from '@mui/material/colors';

// 'errors' prop'unu ekliyoruz
export default function RegisterForm({ form, handleChange, handleSubmit, navigate, errors }) {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 1, width: '100%' }}
      noValidate
    >
      <TextField
        margin="normal"
        required
        fullWidth
        label="Adınız"
        name="firstName"
        autoComplete="given-name"
        autoFocus
        value={form.firstName}
        onChange={handleChange}
        // HATA GÖSTERME KISMI
        error={!!errors.firstname}
        helperText={errors.firstname || ''}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Soyadınız"
        name="lastName"
        autoComplete="family-name"
        value={form.lastName}
        onChange={handleChange}
        // HATA GÖSTERME KISMI
        error={!!errors.lastname}
        helperText={errors.lastname || ''}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Adresiniz"
        name="email"
        autoComplete="email"
        value={form.email}
        onChange={handleChange}
        // HATA GÖSTERME KISMI
        error={!!errors.email}
        helperText={errors.email || ''}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Parola"
        type="password"
        autoComplete="new-password"
        value={form.password}
        onChange={handleChange}
        // HATA GÖSTERME KISMI
        error={!!errors.password}
        helperText={errors.password || ''}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          mb: 2,
          bgcolor: teal['600'],
          '&:hover': { bgcolor: teal['A700'] },
        }}
      >
        Kayıt Ol
      </Button>
      <Typography
        variant="body2"
        sx={{
          cursor: 'pointer',
          textAlign: 'right',
          mt: 0.5,
          color: grey['700'],
        }}
        onClick={() => navigate('/login')}
      >
        Zaten bir hesabın var mı? Giriş yap.
      </Typography>
    </Box>
  );
}