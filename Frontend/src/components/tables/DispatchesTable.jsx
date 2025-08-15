import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Checkbox, IconButton } from '@mui/material'; // IconButton'ı import ediyoruz
import DeleteIcon from '@mui/icons-material/Delete'; // Silme ikonunu import ediyoruz

// İrsaliye türlerini ve numaralarını eşleştiren harita (map)
const dispatchTypeMap = {
  "Mal Alım": 1,
  "Perakende Satış": 2,
  "Toptan Satış": 3,
  "Konsinye Giriş": 4,
  "Konsinye Çıkış": 5,
  "Mal Alım İade": 6,
  "Perakende Satış İade": 7,
  "Toptan Satış İade": 8,
  "Konsinye Giriş İade": 9,
  "Konsinye Çıkış İade": 11,
  "Özel Giriş": 12,
  "Özel Çıkış": 13,
  "Müstahsil İrsaliyesi": 15,
};

// Component artık 'handleDelete' adında bir prop alıyor.
export default function DispatchTable({ rows, loading, handleDelete, ...props }) {
  
  const columns = [
    { field: 'i', headerName: 'İ', width: 40, align: 'center', headerAlign: 'center', renderCell: () => "" },
    { 
      field: 'f', 
      headerName: 'F', 
      width: 40,
      align: 'center', 
      headerAlign: 'center',
      renderCell: (params) => params.value ? "F" : ""
    },
    { 
      field: 't', 
      headerName: 'T', 
      width: 40, 
      align: 'center', 
      headerAlign: 'center',
      valueGetter: (value, row) => dispatchTypeMap[row.turu] || ''
    },
    { field: 'turu', headerName: 'TÜRÜ', width: 180 },
    { 
      field: 'tarih', 
      headerName: 'TARİH', 
      width: 120, 
      type: 'date',
      valueGetter: (value) => value ? new Date(value) : null,
      valueFormatter: (value) => value ? value.toLocaleDateString('tr-TR') : ''
    },
    { field: 'irsaliyeNo', headerName: 'İRSALİYE NO', width: 120 },
    { field: 'cariKodu', headerName: 'CARİ KODU', width: 120 },
    { field: 'unvan', headerName: 'ÜNVAN', width: 200 },
    { field: 'stokHizmetKodu', headerName: 'STOK-HİZMET KODU', width: 150 },
    { field: 'stokHizmetAciklamasi', headerName: 'STOK-HİZMET AÇIKLAMASI', width: 250 },
    { field: 'miktar', headerName: 'MİKTAR', width: 100, type: 'number', align: 'right', headerAlign: 'right' },
    { field: 'birim', headerName: 'BİRİM', width: 80 },
    { field: 'birimFiyati', headerName: 'BİRİM FİYATI', width: 120, type: 'number', align: 'right', headerAlign: 'right' },
    { field: 'tutar', headerName: 'TUTAR', width: 120, type: 'number', align: 'right', headerAlign: 'right' },
    { field: 'doviz', headerName: 'DÖVİZ', width: 80 },

    // --- YENİ EKLENEN İŞLEMLER KOLONU ---
    {
      field: 'actions',
      headerName: 'İşlemler',
      type: 'actions',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <IconButton 
            onClick={(e) => {
              // Satırın geneline tıklama olayının (detay sayfasına gitme) tetiklenmesini engeller.
              e.stopPropagation(); 
              // Ana sayfadan (DispatchesPage) gelen silme fonksiyonunu çağırır.
              handleDelete(params.id);
            }} 
            color="error"
            aria-label="sil"
          >
            <DeleteIcon />
          </IconButton>
        );
      }
    }
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 150px)', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        density="compact"
        initialState={{
          pagination: { paginationModel: { pageSize: 50 } },
        }}
        pageSizeOptions={[25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        {...props}
      />
    </Box>
  );
}
