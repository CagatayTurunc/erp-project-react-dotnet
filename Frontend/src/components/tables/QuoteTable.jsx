import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { green, red, grey } from '@mui/material/colors'; 


export default function QuoteTable({ rows, loading, onRowClick, handleDelete }) {

  const columns = [
    { field: 'documentType', headerName: 'T', width: 70 },
    { 
      field: 'quoteDate', 
      headerName: 'Tarih', 
      width: 120, 
      type: 'date',
      valueGetter: (value) => value ? new Date(value) : null,
      valueFormatter: (value) => value ? value.toLocaleDateString('tr-TR') : ''
    },
    { field: 'documentNumber', headerName: 'Fiş No', width: 120 },
    { field: 'customerCode', headerName: 'Cari Kodu', width: 120 },
    { field: 'customerName', headerName: 'Cari Unvan', width: 250 },
    { field: 'approvalStatus', headerName: 'Onay', width: 130 },
    { field: 'orderStatus', headerName: 'Sipariş Durumu', width: 150 },
    { field: 'invoiceStatus', headerName: 'Fatura Durumu', width: 150 },
    { 
      field: 'grandTotal', 
      headerName: 'Genel Toplam (T)', 
      width: 160, 
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
      renderCell: (params) => (
        <IconButton 
          onClick={(e) => {
            e.stopPropagation(); 
            handleDelete(params.id);
          }} 
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      )
    }
  ];

   return (
    <Box sx={{ height: 'calc(100vh - 150px)', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        density="compact"
        onRowClick={onRowClick}
        rowHeight={42}
        
        
        getRowClassName={(params) => `status--${params.row.approvalStatus.replace(' ', '-')}`}
        
        sx={{
          fontSize: "13px",
          border: "1px solid #ccc",
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
          },

         
          '& .status--Onaylandı': {
            backgroundColor: green[100], // Açık yeşil
            '&:hover': {
              backgroundColor: green[200], // Üzerine gelince koyu yeşil
            }
          },
          '& .status--Reddedildi': {
            backgroundColor: red[100], // Açık kırmızı
            '&:hover': {
              backgroundColor: red[200], // Üzerine gelince koyu kırmızı
            }
          },
          '& .status--Onay-Bekliyor': {
            backgroundColor: grey[200], // Açık gri
            '&:hover': {
              backgroundColor: grey[300], // Üzerine gelince koyu gri
            }
          },
        }}
        
        initialState={{
          pagination: { paginationModel: { pageSize: 50 } },
        }}
        pageSizeOptions={[25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}