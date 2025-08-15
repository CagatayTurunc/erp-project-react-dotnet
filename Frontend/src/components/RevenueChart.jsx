import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

// Şimdilik örnek (statik) veriler
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 4100, 3200, 5000, 4500, 6000];
const xLabels = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

export default function RevenueChart() {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Yıllık Gelir Grafiği
        </Typography>
        <LineChart
          height={300}
          series={[{ data: uData, label: 'Gelir (TL)', yAxisKey: 'leftAxisId', color: '#1976d2' }]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          yAxis={[{ id: 'leftAxisId' }]}
          sx={{
            '.MuiLineElement-root': {
              strokeWidth: 3,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}