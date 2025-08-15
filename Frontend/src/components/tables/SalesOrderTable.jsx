import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Component, ana sayfadan (SalesOrdersPage) bu propları alır:
// rows: Tabloda gösterilecek veri dizisi
// loading: Veri yüklenirken true, bitince false olur
// onRowClick: Bir satıra tıklandığında çalışacak fonksiyon (detay sayfasına gitmek için)
// handleDelete: Silme butonuna tıklandığında çalışacak fonksiyon
export default function SalesOrderTable({ rows, loading, onRowClick, handleDelete }) {

  // Kolon tanımlarını component'in İÇİNE taşıyoruz.
  // Bu, 'handleDelete' gibi proplara renderCell içinden erişebilmemizi sağlar.
  const columns = [
    { 
      field: 'mht', 
      headerName: 'M/H/T', 
      width: 70, 
      valueGetter: (value, row) => `${row.m || ''}/${row.h || ''}/${row.t || ''}`,
      align: 'center', 
      headerAlign: 'center' 
    },
    { field: 'type', headerName: 'Türü', width: 80 },
    { 
      field: 'orderDate', 
      headerName: 'Tarih', 
      width: 110, 
      type: 'date',
      valueGetter: (value) => value ? new Date(value) : null,
      valueFormatter: (value) => value ? value.toLocaleDateString('tr-TR') : ''
    },
    {
      field: 'belgeNo',
      headerName: 'Belge | Cari Kodu Unvan',
      width: 300,
      renderCell: (params) => (
        <Box sx={{ lineHeight: '1.2' }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>{params.row.belgeNo}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{params.row.cariKoduUnvan}</Typography>
        </Box>
      )
    },
    {
      field: 'stokKodu',
      headerName: 'Stok/Hizmet Açıklama',
      width: 300,
      renderCell: (params) => (
        <Box sx={{ lineHeight: '1.2' }}>
          <Typography variant="body2">{params.row.stokKodu}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{params.row.stokAciklama}</Typography>
        </Box>
      )
    },
    { 
      field: 'quantity', 
      headerName: 'Miktar', 
      width: 90,
      type: 'number', 
      align: 'right', 
      headerAlign: 'right',
      valueFormatter: (value) => value != null ? Math.round(value).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
    },
    { field: 'unit', headerName: 'Birim', width: 60 },
    { 
      field: 'pendingQuantity', 
      headerName: 'Bekleyen', 
      width: 90, 
      type: 'number', 
      align: 'right', 
      headerAlign: 'right',
      valueFormatter: (value) => value != null ? Math.round(value).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
    },
    { 
      field: 'shippedQuantity', 
      headerName: 'Sevk Edilen', 
      width: 100, 
      type: 'number', 
      align: 'right', 
      headerAlign: 'right',
      valueFormatter: (value) => value != null ? Math.round(value).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
    },
    { 
      field: 'unitPrice', 
      headerName: 'Birim Fiy.', 
      width: 130,
      type: 'number', 
      align: 'right', 
      headerAlign: 'right',
      valueFormatter: (value) => value != null ? value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' }) : ''
    },
    { 
      field: 'totalAmount', 
      headerName: 'Tutar', 
      width: 130,
      type: 'number', 
      align: 'right', 
      headerAlign: 'right',
      valueFormatter: (value) => value != null ? value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' }) : ''
    },
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
              e.stopPropagation(); // Satırın onRowClick olayını tetiklemesini engeller
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
    <Box sx={{ height: "calc(100vh - 150px)", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        density="compact"
        onRowClick={onRowClick}
        rowHeight={72} 
        sx={{
          fontSize: "13px",
          border: "1px solid #ccc",
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: "#f5f5f5",
            color: "#333",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
          },
          '& .MuiDataGrid-cell': {
            borderBottom: "1px solid #eee",
            padding: "0 8px",
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: "#fafafa",
          },
          '& .MAuiDataGrid-row:hover': {
            backgroundColor: "#e0f2f1",
          },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 100 } },
        }}
        pageSizeOptions={[25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}