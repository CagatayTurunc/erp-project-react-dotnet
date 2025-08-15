// Bu dosya, farklı sayfalardaki "Ekle" menülerinin içeriğini tanımlar.

export const dispatchMenuItems = {
  main: [
    { label: "1. Alım", subMenuKey: "alim" },
    { label: "2. Satış", subMenuKey: "satis" },
    
  ],
  alim: [
    { label: "1. Mal Alım (1)" },
    { label: "2. Konsinye Giriş (4)" },
    { label: "3. Mal Alım İade (6)" },
    { label: "4. Konsinye Giriş İade (9)" }, 
    { label: "5. Özel Giriş (12)" },
    { label: "6. Müstahsil İrsaliyesi (15)" },
  ],
  satis: [
    { label: "1. Perakende Satış (2)" },
    { label: "2. Toptan Satış (3)" },
    { label: "3. Konsinye Çıkış (5)" },
    { label: "4. Perakende Satış İade (7)" },
    { label: "5. Toptan Satış İade (8)" },
    { label: "6. Konsinye Çıkış İade (11)" },
    { label: "7. Özel Çıkış (13)" },
  ]
};

export const quoteMenuItems = {
    main: [
      { label: "1. Alım Teklifi", subMenuKey: "alim" },
      { label: "2. Satış Teklifi", subMenuKey: "satis" },
    ],
    alim: [
      { label: "Alınan Teklif" },
      { label: "Alınan Teklif (Proforma)" },
    ],
    satis: [
      { label: "Verilen Teklif" },
      { label: "Verilen Teklif (Proforma)" },
    ]
  };
// main: [fatura için 
//       { label: "1. Alım", subMenuKey: "alim" },
//       { label: "2. Satış", subMenuKey: "satis" },
      
//     ],
//     alim: [
//       { label: "1. Mal Alım (1)" },
//       { label: "2. Alınan Hizmet (4)" },
//       { label: "3. Alım İade (6)" },
//       { label: "4. Alınan Fiyat Farkı (9)" },
//       { label: "5. Müstahsil Makbuzu (15)" },
//     ],
//     satis: [
//       { label: "1. Perakende Satış (2)" },
//       { label: "2. Toptan Satış (3)" },
//       { label: "3. Verilen Hizmet (5)" },
//       { label: "4. Perakende Satış İade (7)" },
//       { label: "5. Topntan Satış İade (8)" },
//       { label: "6. Verilen Fiyat Farkı (10)" },
      
//     ]
// Gelecekte Fatura sayfası için de buraya ekleyebilirsiniz:
// export const invoiceMenuItems = { ... };
