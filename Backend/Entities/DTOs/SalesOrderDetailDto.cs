using Core.Entities;
using System;

namespace Entities.DTOs
{
    public class SalesOrderDetailDto : IDto
    {
        public int Id { get; set; }
        public string MHT { get; set; }
        public string Type { get; set; }
        public DateTime OrderDate { get; set; }
        public string BelgeNo { get; set; }
        public string CariKoduUnvan { get; set; } // Müşteri tablosundan gelecek
        public string StokKodu { get; set; }      // Ürün tablosundan gelecek
        public string StokAciklama { get; set; } // Ürün tablosundan gelecek
        public decimal Quantity { get; set; }
        public string Unit { get; set; }
        public bool IsCompleted { get; set; }
        public decimal PendingQuantity { get; set; }
        public decimal BillableQuantity { get; set; }
        public decimal ShippedQuantity { get; set; }
        public string LotNumber { get; set; }
        public decimal UnitPrice { get; set; }
        public string Currency { get; set; }
        public decimal TotalAmount { get; set; }
        public List<SalesOrderLineItemDto> LineItems { get; set; } // Sipariş satırları

        // --- BU ALANLARIN MEVCUT OLDUĞUNDAN EMİN OLUN ---
        public decimal AraToplam { get; set; }
        public decimal KDV { get; set; }
        public decimal GenelToplam { get; set; }
    }
}