import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import DispatchTable from '../../components/tables/DispatchesTable'; // Dosya adını kontrol et: DispatchesTable -> DispatchTable
import PageFooterActions from '../../components/common/PageFooterActions'; // 1. YENİ COMPONENT'İ IMPORT EDİYORUZ
import { dispatchMenuItems } from '../../config/menuConfig';
import { getDispatches, deleteDispatchLine } from '../../services/dispatchService';

export default function DispatchesPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDispatches = async () => {
    setLoading(true);
    try {
      const response = await getDispatches();
      const rawData = response.data.data || [];
      setRows(rawData.map(row => ({ ...row, id: row.id || row.Id })));
    } catch (error) {
      console.error("İrsaliyeler çekilirken hata oluştu:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDispatches();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu irsaliyeyi silmek istediğinizden emin misiniz?")) {
      try {
        await deleteDispatchLine(id);
        fetchDispatches(); 
      } catch (error) {
        console.error("İrsaliye satırı silinirken hata oluştu!", error);
      }
    }
  };

  return (
    // 2. SAYFAYI DİKEY BİR FLEX CONTAINER'A DÖNÜŞTÜRÜYORUZ
    <Box sx={{ p: 3, width: '100%', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
      
      {/* Üst Başlık ve Buton Alanı */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          İrsaliye Listesi
        </Typography>
        
      </Box>
      
      {/* Tablo Alanı - Kalan tüm boşluğu dolduracak şekilde ayarlanıyor */}
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <DispatchTable
          rows={rows}
          loading={loading}
          handleDelete={handleDelete}
        />
      </Box>

      {/* 3. YENİ COMPONENT'İ BURADA ÇAĞIRIYORUZ */}
      <PageFooterActions addMenuItems={dispatchMenuItems} />

    </Box>
  );
}
