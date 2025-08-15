import React from 'react';
import { Grid, Box } from '@mui/material';
import StatCard from '../../components/StatCard';
import RevenueChart from '../../components/RevenueChart';

// Ikonlar
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { green, orange, red } from '@mui/material/colors';

export default function DashboardPage() {
  return (
    <Box>
      {/* Üst Kısımdaki İstatistik Kartları */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<AttachMoneyIcon />}
            title="Toplam Gelir"
            value="₺150,450"
            color={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<ShoppingCartIcon />}
            title="Toplam Sipariş"
            value="2,540"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<PeopleIcon />}
            title="Yeni Müşteriler"
            value="320"
            color={orange[500]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<ShowChartIcon />}
            title="Büyüme Oranı"
            value="+%15.6"
            color={red[500]}
          />
        </Grid>

        {/* Ana Grafik */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <RevenueChart />
        </Grid>
      </Grid>
    </Box>
  );
}