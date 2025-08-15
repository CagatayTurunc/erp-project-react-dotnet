import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { blue } from '@mui/material/colors';

export default function StatCard({ icon, title, value, color = blue[500] }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 2, boxShadow: 3 }}>
      <Avatar sx={{ bgcolor: color, width: 56, height: 56, mr: 2 }}>
        {icon}
      </Avatar>
      <Box>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div" fontWeight="bold">
          {value}
        </Typography>
      </Box>
    </Card>
  );
}