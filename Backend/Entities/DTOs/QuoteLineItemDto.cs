using Core.Entities;

namespace Entities.DTOs
{
    public class QuoteLineItemDto : IDto
    {
        public int Id { get; set; }
        public string Tur { get; set; } // "Malzeme"
        public string Kodu { get; set; } // "00016"
        public string Aciklama { get; set; } // "2240254 3G-IE SOLO FIRIN"
        public decimal Miktar { get; set; } // 10,00
        public string Birim { get; set; } // "AD"
        public decimal BirimFiyat { get; set; } // 5000,00
        public string KDV_DH { get; set; } // "Hariç"
        public string DovizTuru { get; set; } // "USD"
        public decimal Kur { get; set; } // 34,2869
        public decimal Tutan { get; set; } // 171434,...
        public decimal Toplam { get; set; } // 0
        public decimal KDV_Yuzde { get; set; } // 18,00
        public string PaketKapNo { get; set; }
        public int PaketKapAdedi { get; set; } // 0
        public string PaketTip { get; set; } // "-"
        public int SiraNo { get; set; } // 10
        public string Kampanya { get; set; }
    }
}
