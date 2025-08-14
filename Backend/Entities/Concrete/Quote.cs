using Core.Entities;
using Entities.Concrete.Enums; // Gerekirse kendi Enum'ınızı oluşturun
using System;
using System.Collections.Generic;

namespace Entities.Concrete
{
    public class Quote : IEntity, IAuditableEntity
    {
        public int Id { get; set; }
        public string DocumentType { get; set; } // T (Teklif)
        public DateTime QuoteDate { get; set; }  // Tarih
        public string DocumentNumber { get; set; } // Fiş No
        public int CustomerId { get; set; }
        public string ApprovalStatus { get; set; } // Onay
        public string OrderStatus { get; set; } // Sipariş Durumu
        public string InvoiceStatus { get; set; } // Fatura Durumu
        public string Description { get; set; } // Açıklaması
        public decimal GrandTotal { get; set; } // Genel Toplam
        public List<QuoteLineItem> LineItems { get; set; }

        // IAuditableEntity'den gelen alanlar
        public DateTime CreatedDate { get; set; }
        public int CreatedByUserId { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedByUserId { get; set; }
    }
}