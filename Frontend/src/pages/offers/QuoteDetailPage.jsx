import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuoteById } from '../../services/quoteService';
import { yellow } from '@mui/material/colors';
import { Box, Typography, Paper, Grid, TextField, Button, CircularProgress, Tabs, Tab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// --- Alt Toplamlar İçin Alt Component ---
const TotalsDisplay = ({ quote }) => (
  <Paper sx={{ p: 2, mt: 2 }}>
    <Typography variant="h6" gutterBottom>Alt Toplamlar</Typography>
    <Grid container spacing={1}>
      <Grid item xs={6}><Typography align="right">Ara Toplam:</Typography></Grid>
      <Grid item xs={6}><Typography align="right">{quote.araToplam?.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Typography></Grid>
      <Grid item xs={6}><Typography align="right">Masraf:</Typography></Grid>
      <Grid item xs={6}><Typography align="right">0,00 TL</Typography></Grid>
      <Grid item xs={6}><Typography align="right">İndirim:</Typography></Grid>
      <Grid item xs={6}><Typography align="right">0,00 TL</Typography></Grid>
      <Grid item xs={6}><Typography sx={{ fontWeight: 'bold' }} align="right">Toplam:</Typography></Grid>
      <Grid item xs={6}><Typography sx={{ fontWeight: 'bold' }} align="right">{quote.araToplam?.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Typography></Grid>
      <Grid item xs={6}><Typography align="right">Özel Vergi:</Typography></Grid>
      <Grid item xs={6}><Typography align="right">0,00 TL</Typography></Grid>
      <Grid item xs={6}><Typography align="right">KDV:</Typography></Grid>
      <Grid item xs={6}><Typography align="right">{quote.kdv?.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Typography></Grid>
      <Grid item xs={12}><hr style={{ border: 'none', borderTop: '1px solid #eee' }} /></Grid>
      <Grid item xs={6}><Typography variant="h6" align="right">G. Toplam:</Typography></Grid>
      <Grid item xs={6}><Typography variant="h6" align="right">{quote.grandTotal?.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</Typography></Grid>
    </Grid>
  </Paper>
);

// --- İşlemler (Teklif Satırları) Tablosu İçin Alt Component ---
const QuoteLineItems = ({ lineItems = [] }) => {
  // Resimdeki tüm kolonları içeren yeni kolon tanımları
  const columns = [
    { field: 'tur', headerName: 'Tür', width: 80 },
    { field: 'kodu', headerName: 'Kodu', width: 100 },
    { field: 'aciklama', headerName: 'Açıklama', width: 250 },
    { 
      field: 'miktar', 
      headerName: 'Miktar', 
      width: 100, 
      type: 'number', 
      align: 'right', 
      headerAlign: 'right',
      valueFormatter: (value) => value != null ? value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
    },
    { field: 'birim', headerName: 'Birim', width: 80 },
    { 
      field: 'birimFiyat', 
      headerName: 'Birim Fiyat', 
      width: 120, 
      type: 'number', 
      align: 'right', 
      headerAlign: 'right',
      valueFormatter: (value) => value != null ? value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
    },
    { field: 'kdv_DH', headerName: 'KDV D/H', width: 80 },
    { field: 'dovizTuru', headerName: 'Döviz Türü', width: 90 },
    { 
      field: 'kur', 
      headerName: 'Kur', 
      width: 100, 
      type: 'number', 
      align: 'right', 
      headerAlign: 'right',
      valueFormatter: (value) => value != null ? value.toLocaleString('tr-TR', { minimumFractionDigits: 4, maximumFractionDigits: 4 }) : ''
    },
    { 
      field: 'tutan', 
      headerName: 'Tutan', 
      width: 120, 
      type: 'number', 
      align: 'right', 
      headerAlign: 'right',
      valueFormatter: (value) => value != null ? value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
    },
    { 
      field: 'toplam', 
      headerName: 'Toplam', 
      width: 120, 
      type: 'number', 
      align: 'right', 
      headerAlign: 'right',
      valueFormatter: (value) => value != null ? value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
    },
    { 
      field: 'kdv_Yuzde', 
      headerName: 'KDV %', 
      width: 80, 
      type: 'number', 
      align: 'right', 
      headerAlign: 'right' 
    },
    { field: 'paketKapNo', headerName: 'Paket - Kap No', width: 120 },
    { field: 'paketKapAdedi', headerName: 'Paket - Kap Adedi', width: 130, type: 'number' },
    { field: 'paketTip', headerName: 'Paket - Tip', width: 100 },
    { field: 'siraNo', headerName: 'Sıra N', width: 80, type: 'number' },
    { field: 'kampanya', headerName: 'Kampanya', flex: 1 },
  ];

  return (
    <Box sx={{ height: 300, width: '100%', mt: 2 }}>
      <DataGrid
        rows={lineItems}
        columns={columns}
        density="compact"
        hideFooter
        sx={{
          fontSize: '12px',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f0f0f0',
            color: '#2a2a2aff',
          },
          '& .MuiDataGrid-row': {
            backgroundColor: yellow[100],
            '&:hover': {
              backgroundColor: yellow[200],
            }
          },
        }}
      />
    </Box>
  );
};

// --- Ana Sayfa Component'i ---
export default function QuoteDetailPage() {
  const { id } = useParams(); // URL'den :id parametresini alır
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuoteDetails = async () => {
      setLoading(true);
      try {
        const response = await getQuoteById(id);
        setQuote(response.data.data);
      } catch (error) {
        console.error("Teklif detayı çekilirken hata!", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuoteDetails();
  }, [id]); // id değiştiğinde tekrar veri çek

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (!quote) {
    return <Typography sx={{ p: 3 }}>Teklif bulunamadı.</Typography>;
  }

  return (
    <Box sx={{ p: 2, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      {/* ÜST BİLGİLER BÖLÜMÜ */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          {/* Fiş Bilgileri */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Fiş Bilgileri</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}><TextField size="small" label="Şube" value={quote.sube || 'MERKEZ'} fullWidth InputProps={{ readOnly: true }} variant="standard" /></Grid>
              <Grid item xs={6}><TextField size="small" label="Belge No" value={quote.documentNumber || ''} fullWidth InputProps={{ readOnly: true }} variant="standard" /></Grid>
              <Grid item xs={6}><TextField size="small" label="Tarih" value={new Date(quote.quoteDate).toLocaleDateString('tr-TR') || ''} fullWidth InputProps={{ readOnly: true }} variant="standard" /></Grid>
              <Grid item xs={6}><TextField size="small" label="Saat" value={new Date(quote.quoteDate).toLocaleTimeString('tr-TR') || ''} fullWidth InputProps={{ readOnly: true }} variant="standard" /></Grid>
            </Grid>
          </Grid>
          {/* Cari Hesap Bilgileri */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Cari Hesap Bilgileri</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}><TextField size="small" label="Hesap Kodu" value={quote.customerCode || ''} fullWidth InputProps={{ readOnly: true }} variant="standard" /></Grid>
              <Grid item xs={6}><TextField size="small" label="Unvanı" value={quote.customerName || ''} fullWidth InputProps={{ readOnly: true }} variant="standard" /></Grid>
              <Grid item xs={12}><TextField size="small" label="Sevk Adresi" value={quote.sevkAdresi || 'OSTİM MAH. OSTİM SOK. NO:118'} fullWidth InputProps={{ readOnly: true }} variant="standard" /></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* İŞLEMLER (TEKLİF SATIRLARI) BÖLÜMÜ */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Tabs value={0} aria-label="quote details tabs">
          <Tab label="İşlemler" />
        </Tabs>
        <QuoteLineItems lineItems={quote.lineItems} />
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
          <TotalsDisplay quote={quote} />
        </Grid>
      </Grid>
      
      {/* BUTONLAR */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button variant="outlined" color="primary">Diğer</Button>
        <Button variant="outlined" color="error" onClick={() => navigate(-1)}>Vazgeç</Button>
        <Button variant="contained" color="primary">Kaydet</Button>
      </Box>
    </Box>
  );
}
