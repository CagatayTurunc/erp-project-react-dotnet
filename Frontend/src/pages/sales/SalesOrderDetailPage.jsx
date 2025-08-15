import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSalesOrderById } from '../../services/salesOrderService';
import { Box, Typography, Paper, Grid, TextField, Button, CircularProgress, Tabs, Tab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// --- Alt Toplamlar İçin Alt Component ---
const TotalsDisplay = ({ order }) => (
  <Paper sx={{ p: 2, mt: 2 }}>
    <Typography variant="h6" gutterBottom>Alt Toplamlar</Typography>
    <Grid container spacing={1}>
      <Grid item xs={6}><Typography align="right">Ara Toplam:</Typography></Grid>
      <Grid item xs={6}><Typography align="right">{order.araToplam?.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Typography></Grid>
      <Grid item xs={6}><Typography align="right">Masraf:</Typography></Grid>
      <Grid item xs={6}><Typography align="right">0,00 TL</Typography></Grid>
      <Grid item xs={6}><Typography align="right">İndirim:</Typography></Grid>
      <Grid item xs={6}><Typography align="right">0,00 TL</Typography></Grid>
      <Grid item xs={6}><Typography sx={{ fontWeight: 'bold' }} align="right">Toplam:</Typography></Grid>
      <Grid item xs={6}><Typography sx={{ fontWeight: 'bold' }} align="right">{order.araToplam?.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Typography></Grid>
      <Grid item xs={6}><Typography align="right">Özel Vergi:</Typography></Grid>
      <Grid item xs={6}><Typography align="right">0,00 TL</Typography></Grid>
      <Grid item xs={6}><Typography align="right">KDV:</Typography></Grid>
      <Grid item xs={6}><Typography align="right">{order.kdv?.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Typography></Grid>
      <Grid item xs={12}><hr /></Grid>
      <Grid item xs={6}><Typography variant="h6" align="right">G. Toplam:</Typography></Grid>
      <Grid item xs={6}><Typography variant="h6" align="right">{order.genelToplam?.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Typography></Grid>
    </Grid>
  </Paper>
);

// --- İşlemler (Satırlar) Tablosu İçin Alt Component ---
const OrderLineItems = ({ lineItems = [] }) => {
  const columns = [
    { field: 'tip', headerName: 'Tip', width: 80 },
    { field: 'kodu', headerName: 'Kodu', width: 120 },
    { field: 'aciklama', headerName: 'Açıklama', width: 250 },
    { field: 'miktar', headerName: 'Miktar', width: 100, type: 'number', align: 'right' },
    { field: 'birim', headerName: 'Birim', width: 80 },
    { field: 'birimFiyat', headerName: 'Birim Fiyat', width: 120, type: 'number', align: 'right' },
    { field: 'kdv', headerName: 'KDV %', width: 80, type: 'number', align: 'right' },
    { field: 'tutar', headerName: 'Tutar', width: 120, type: 'number', align: 'right' },
  ];

  return (
    <Box sx={{ height: 250, width: '100%', mt: 2 }}>
      <DataGrid
        rows={lineItems}
        columns={columns}
        density="compact"
        hideFooter
        sx={{ fontSize: '12px' }}
      />
    </Box>
  );
};


// --- Ana Sayfa Component'i ---
export default function SalesOrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getSalesOrderById(id);
        setOrder(response.data.data);
      } catch (error) {
        console.error("Sipariş detayı çekilirken hata!", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (!order) {
    return <Typography sx={{ p: 3 }}>Sipariş bulunamadı.</Typography>;
  }

  return (
    <Box sx={{ p: 2, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      {/* ÜST BİLGİLER BÖLÜMÜ */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          {/* Fiş Bilgileri */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Fiş Bilgileri</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}><TextField size="small" label="Şube" value={order.sube || 'MERKEZ DEPO'} fullWidth InputProps={{ readOnly: true }} /></Grid>
              <Grid item xs={12}><TextField size="small" label="Belge No" value={order.sevkAdresi || ''} fullWidth InputProps={{ readOnly: true }} /></Grid>
              <Grid item xs={6}><TextField size="small" label="Tarih" value={new Date(order.orderDate).toLocaleDateString('tr-TR') || ''} fullWidth InputProps={{ readOnly: true }} /></Grid>
              <Grid item xs={6}><TextField size="small" label="Saat" value={'00:00:00'} fullWidth InputProps={{ readOnly: true }} /></Grid>
            </Grid>
          </Grid>
          {/* Cari Hesap Bilgileri */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Cari Hesap Bilgileri</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}><TextField size="small" label="Cari Kodu" value={order.belgeNo || ''} fullWidth InputProps={{ readOnly: true }} /></Grid>
              <Grid item xs={6}><TextField size="small" label="Unvanı" value={order.cariKoduUnvan || ''} fullWidth InputProps={{ readOnly: true }} /></Grid>
              <Grid item xs={12}><TextField size="small" label="Sevk Adresi" value={order.sevkAdresi || 'Fatura Adresi'} fullWidth InputProps={{ readOnly: true }} /></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* İŞLEMLER (SİPARİŞ SATIRLARI) BÖLÜMÜ */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Tabs value={0} aria-label="order details tabs">
          <Tab label="İşlemler" />
        </Tabs>
        <OrderLineItems lineItems={order.lineItems} />
      </Paper>

      {/* ALT BİLGİLER BÖLÜMÜ */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Tabs value={0} aria-label="footer tabs">
              <Tab label="İndirim & Masraflar" />
              <Tab label="Seri-Lot" />
            </Tabs>
            <Typography sx={{ mt: 2 }}>İçerik buraya gelecek...</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalsDisplay order={order} />
        </Grid>
      </Grid>
      
      {/* Butonlar */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button variant="outlined" color="primary">Diğer</Button>
        <Button variant="outlined" color="error" onClick={() => navigate(-1)}>Vazgeç</Button>
        <Button variant="contained" color="primary">Kaydet</Button>
      </Box>
    </Box>
  );
}