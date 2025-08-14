
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.EntityFrameworkCore; // Include metodu için bu using ifadesi ŞARTTIR
using System.Collections.Generic;
using System.Linq;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfQuoteDal : EfEntityRepositoryBase<Quote, NorthwindContext>, IQuoteDal
    {
        public EfQuoteDal(NorthwindContext context) : base(context) { }

        // TÜM TEKLİFLERİ LİSTELEMEK İÇİN KULLANILAN METOT
        public List<QuoteDetailDto> GetQuoteDetails()
        {
            // Bu sorgu, Customers tablosuyla JOIN yaparak liste için gerekli DTO'yu oluşturur.
            var result = from q in _context.Quotes
                         join c in _context.Customers on q.CustomerId equals c.Id
                         select new QuoteDetailDto
                         {
                             Id = q.Id,
                             DocumentType = q.DocumentType,
                             QuoteDate = q.QuoteDate,
                             DocumentNumber = q.DocumentNumber,
                             CustomerCode = c.CustomerCode,
                             CustomerName = c.CompanyName,
                             ApprovalStatus = q.ApprovalStatus,
                             OrderStatus = q.OrderStatus,
                             InvoiceStatus = q.InvoiceStatus,
                             Description = q.Description,
                             GrandTotal = q.GrandTotal
                         };
            return result.ToList();
        }

        // TEK BİR TEKLİFİN TÜM DETAYLARINI (SATIRLARI DAHİL) GETİREN METOT
        public QuoteDetailDto GetQuoteDetailById(int quoteId)
        {
            // 1. Include() metodu ile ilgili teklif satırlarını (LineItems) da ana sorguya dahil ediyoruz.
            var quoteEntity = _context.Quotes
                                     .Include(q => q.LineItems)
                                     .FirstOrDefault(q => q.Id == quoteId);

            if (quoteEntity == null)
            {
                return null; // Teklif bulunamazsa null döndür
            }

            var customer = _context.Customers.FirstOrDefault(c => c.Id == quoteEntity.CustomerId);

            // 2. Entity'den DTO'ya manuel olarak map'liyoruz (dönüştürüyoruz).
            var dto = new QuoteDetailDto
            {
                Id = quoteEntity.Id,
                DocumentNumber = quoteEntity.DocumentNumber,
                QuoteDate = quoteEntity.QuoteDate,
                CustomerName = customer?.CompanyName,
                CustomerCode = customer?.CustomerCode,
                // DTO'nuzdaki diğer ana alanları buraya ekleyebilirsiniz (ApprovalStatus, OrderStatus vb.)
                ApprovalStatus = quoteEntity.ApprovalStatus,
                OrderStatus = quoteEntity.OrderStatus,
                InvoiceStatus = quoteEntity.InvoiceStatus,
                Description = quoteEntity.Description,
                GrandTotal = quoteEntity.GrandTotal,

                // 3. Artık quoteEntity.LineItems dolu olduğu için bu dönüşüm doğru çalışacaktır.
                LineItems = quoteEntity.LineItems.Select(line => new QuoteLineItemDto
                {
                    Id = line.Id,
                    Tur = line.Type,
                    Kodu = "STOK-" + line.ProductId, // Gerçek ürün kodunu Product tablosundan almalısınız
                    Aciklama = line.Description,
                    Miktar = line.Quantity,
                    Birim = line.Unit,
                    BirimFiyat = line.UnitPrice,
                    KDV_DH = line.VatType,
                    DovizTuru = line.Currency,
                    Kur = line.ExchangeRate,
                    Tutan = line.SubTotal,
                    Toplam = line.TotalAmount,
                    KDV_Yuzde = line.VatRate,
                    PaketKapNo = line.PackageNumber,
                    PaketKapAdedi = line.PackageQuantity,
                    PaketTip = line.PackageType,
                    SiraNo = line.LineNumber,
                    Kampanya = line.CampaignInfo
                }).ToList()
            };

            return dto;
        }
    }
}
