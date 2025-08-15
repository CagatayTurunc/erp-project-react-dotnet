// import React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Box, Typography, Checkbox } from '@mui/material';

// // Adım 1: Kolonları, resimdeki gibi detaylı bir şekilde yeniden tanımlıyoruz.
// const columns = [
//   { field: 'mht', headerName: 'M/H/T', width: 70, 
//     // Birden fazla alanı tek bir hücrede birleştirmek için valueGetter kullanılabilir
//     valueGetter: (value, row) => `${row.m || ''} / ${row.h || ''} / ${row.t || ''}`,
//     align: 'center', 
//     headerAlign: 'center' 
//   },
//   { field: 'type', headerName: 'Türü', width: 80 },
//   { field: 'orderDate', headerName: 'Tarih', width: 110, type: 'date',
//     valueGetter: (value) => value ? new Date(value) : null,
//     valueFormatter: (value) => value ? value.toLocaleDateString('tr-TR') : ''
//   },
//   { 
//     field: 'belgeNo', 
//     headerName: 'Belge | Cari Kodu Unvan', 
//     width: 250,
//     renderCell: (params) => (
//       <Box sx={{ lineHeight: '1.2' }}>
//         <Typography variant="body2" sx={{ fontWeight: 500 }}>{params.row.belgeNo}</Typography>
//         <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//           {params.row.cariKoduUnvan}
//         </Typography>
//       </Box>
//     )
//   },
//   { 
//     field: 'stokKodu', 
//     headerName: 'Stok/Hizme Açıklama', 
//     width: 250,
//     renderCell: (params) => (
//       <Box sx={{ lineHeight: '1.2' }}>
//         <Typography variant="body2">{params.row.stokKodu}</Typography>
//         <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//           {params.row.stokAciklama}
//         </Typography>
//       </Box>
//     )
//   },
//   { field: 'quantity', headerName: 'Miktar', width: 80, type: 'number', align: 'right', headerAlign: 'right' },
//   { field: 'unit', headerName: 'Birim', width: 60 },
//   { field: 'pendingQuantity', headerName: 'Bekleyen', width: 90, type: 'number', align: 'right', headerAlign: 'right' },
//   { field: 'shippedQuantity', headerName: 'Sevk Edilen', width: 100, type: 'number', align: 'right', headerAlign: 'right' },
//   { field: 'unitPrice', headerName: 'Birim Fiy.', width: 120, type: 'number', align: 'right', headerAlign: 'right',
//     valueFormatter: (value) => value ? value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
//   },
//   { field: 'totalAmount', headerName: 'Tutar', width: 120, type: 'number', align: 'right', headerAlign: 'right',
//     valueFormatter: (value) => value ? value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
//   },
//   // İhtiyacınıza göre diğer kolonları da buraya ekleyebilirsiniz (Lot No, Döviz, Toplam vb.)
// ];


// export default function SalesOrderTable({ rows, loading }) {
//   return (
//     <Box sx={{ height: 'calc(100vh - 150px)', width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         loading={loading}
        
//         // Adım 2: Tabloyu, resimdeki gibi yoğun ve profesyonel bir görünüme kavuşturuyoruz.
//         density="compact"
//         sx={{
//           fontSize: '12px', // Daha küçük font boyutu
//           border: '1px solid #ccc',
//           '& .MuiDataGrid-columnHeaders': {
//             backgroundColor: '#f5f5f5',
//             color: '#333',
//             fontWeight: 'bold',
//             borderBottom: '1px solid #ccc',
//           },
//           '& .MuiDataGrid-cell': {
//             borderBottom: '1px solid #eee', // Daha soluk hücre çizgileri
//           },
//           '&.MuiDataGrid-root--densityCompact .MuiDataGrid-row': {
//             minHeight: '48px', // İki satırlı hücreler için yeterli yükseklik
//           },
//           '& .MuiDataGrid-row:nth-of-type(odd)': {
//             backgroundColor: '#fafafa', // Zebra deseni (bir dolu bir boş satır)
//           },
//           '& .MuiDataGrid-row:hover': {
//             backgroundColor: '#e0f2f1', // Üzerine gelince belirginleşme
//           },
//         }}
        
//         // Diğer özellikler
//         initialState={{
//           pagination: { paginationModel: { pageSize: 100 } },
//         }}
//         pageSizeOptions={[25, 50, 100]}
//         checkboxSelection
//         disableRowSelectionOnClick
//       />
//     </Box>
//   );
// }