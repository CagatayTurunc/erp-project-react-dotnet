import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import QuoteTable from '../../components/tables/QuoteTable';
import { getQuotes, deleteQuote } from '../../services/quoteService';

export default function QuotesPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRowClick = (params) => {
    navigate(`/quotes/${params.id}`);
  };

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const response = await getQuotes();
      const rawData = response.data.data || [];
      const dataWithId = rawData.map(row => ({
        ...row,
        id: row.id || row.Id
      }));
      setRows(dataWithId);
    } catch (error) {
      console.error("Teklifler çekilirken hata oluştu:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu teklifi silmek istediğinizden emin misiniz?")) {
      try {
        await deleteQuote(id);
        // Silme sonrası listeyi yeniden çekerek güncellemek daha güvenilirdir
        fetchQuotes(); 
      } catch (error) {
        console.error("Teklif silinirken hata oluştu!", error);
      }
    }
  };

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Teklif Listesi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Yeni Teklif Ekle
        </Button>
      </Box>
      <QuoteTable
        rows={rows}
        loading={loading}
        onRowClick={handleRowClick}
        handleDelete={handleDelete}
      />
    </Box>
  );
}