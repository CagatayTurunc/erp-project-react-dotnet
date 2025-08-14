using Core.Entities;

namespace Entities.Concrete
{
    public class QuoteLineItem : IEntity
    {
        public int Id { get; set; }
        public int QuoteId { get; set; }
        public int ProductId { get; set; }
        public string Type { get; set; } // DTO'daki 'Tur' alanına karşılık gelir
        public string Description { get; set; } // DTO'daki 'Aciklama' alanına karşılık gelir
        public decimal Quantity { get; set; } // DTO'daki 'Miktar' alanına karşılık gelir
        public string Unit { get; set; } // DTO'daki 'Birim' alanına karşılık gelir
        public decimal UnitPrice { get; set; } // DTO'daki 'BirimFiyat' alanına karşılık gelir
        public string VatType { get; set; } // DTO'daki 'KDV_DH' alanına karşılık gelir
        public string Currency { get; set; } // DTO'daki 'DovizTuru' alanına karşılık gelir
        public decimal ExchangeRate { get; set; } // DTO'daki 'Kur' alanına karşılık gelir
        public decimal SubTotal { get; set; } // DTO'daki 'Tutan' alanına karşılık gelir
        public decimal VatRate { get; set; } // DTO'daki 'KDV_Yuzde' alanına karşılık gelir
        public decimal TotalAmount { get; set; } // DTO'daki 'Toplam' alanına karşılık gelir
        public string PackageNumber { get; set; } // DTO'daki 'PaketKapNo' alanına karşılık gelir
        public int PackageQuantity { get; set; } // DTO'daki 'PaketKapAdedi' alanına karşılık gelir
        public string PackageType { get; set; } // DTO'daki 'PaketTip' alanına karşılık gelir
        public int LineNumber { get; set; } // DTO'daki 'SiraNo' alanına karşılık gelir
        public string CampaignInfo { get; set; } // DTO'daki 'Kampanya' alanına karşılık gelir
    }
}
