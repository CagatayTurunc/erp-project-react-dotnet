// src/pages/sales/SalesOrdersPage.jsx

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import SalesOrderTable from '../../components/tables/SalesOrderTable';
import { deleteSalesOrder, getSalesOrders } from '../../services/salesOrderService';
import { useNavigate } from 'react-router-dom';

export default function SalesOrdersPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  

   const navigate = useNavigate();
   const handleRowClick = (params) => {
    // params.id, tıklanan satırın ID'sini içerir
    navigate(`/sales-orders/${params.id}`);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // API'den veriyi çekiyoruz
        const response = await getSalesOrders({ pageNumber: 1, pageSize: 200 });
        
        // Gelen cevabın içindeki 'data' dizisini aldığımızdan emin oluyoruz
        const rawData = response.data.data || [];
        
        // DataGrid'in çalışması için her satırın 'id' (küçük harfle) adında bir alanı olmalı.
        // Backend'den 'Id' (büyük harfle) gelebilir. Bu yüzden küçük harfli 'id'yi garantiye alıyoruz.
        const dataWithId = rawData.map(row => ({
          ...row,
          id: row.id || row.Id 
        }));
        
        // Veriyi state'e aktarıyoruz
        setRows(dataWithId);

      } catch (error) {
        console.error("Siparişler çekilirken hata oluştu:", error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []); // Boş dizi, bu kodun sayfa ilk yüklendiğinde bir kez çalışmasını sağlar
  

const handleDelete = async (id) => {
    // Silmeden önce kullanıcıdan onay alalım (basit bir yöntem)
    const confirmed = window.confirm("Bu siparişi silmek istediğinizden emin misiniz?");
    if (confirmed) {
      try {
        await deleteSalesOrder(id);
        // Başarılı silme sonrası, sildiğimiz satırı state'ten çıkararak ekranı güncelliyoruz.
        setRows(rows.filter((row) => row.id !== id));
        // Burada bir başarı mesajı (toast notification) gösterebilirsiniz.
      } catch (error) {
        console.error("Sipariş silinirken hata oluştu!", error);
        // Burada bir hata mesajı gösterebilirsiniz.
      }
    }
  };



  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Satış Siparişleri
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Yeni Sipariş Ekle
        </Button>
      </Box>
      
      {/* 'rows' ve 'loading' state'lerini tabloya props olarak geçiyoruz */}
      <SalesOrderTable rows={rows} loading={loading} onRowClick={handleRowClick} handleDelete={handleDelete}/>
    </Box>
  );
}