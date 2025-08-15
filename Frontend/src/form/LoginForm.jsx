import React from 'react';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import { grey, teal } from '@mui/material/colors';

// Bu component kendi state'ini tutmaz, her şeyi props olarak alır
export default function LoginForm({ form, handleChange, handleSubmit, navigate }) {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 1, width: '100%' }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={form.email}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={form.password}
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            color="primary"
          />
        }
        label="Beni Hatırla"
      />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
            Şifremi Unuttum
            
          </Typography>
        </Grid>
      </Grid>
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
        Giriş Yap
      </Button>
      <Typography
        variant="body2"
        sx={{
          cursor: 'pointer',
          textAlign: 'right',
          mt: 0.5,
          color: grey['700'],
        }}
        onClick={() => navigate('/register')}
      >
        Hesabın yok mu? Kayıt ol.
      </Typography>
    </Box>
  );
}