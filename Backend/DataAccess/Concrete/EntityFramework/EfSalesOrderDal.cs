using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

// Namespace'i kendi projenize göre düzenlemeniz gerekebilir.
namespace DataAccess.Concrete.EntityFramework
{
    public class EfSalesOrderDal : EfEntityRepositoryBase<SalesOrder, NorthwindContext>, ISalesOrderDal
    {
        public EfSalesOrderDal(NorthwindContext context) : base(context) { }

        // TÜM SİPARİŞLERİ LİSTELEMEK İÇİN KULLANILAN METOT
        public List<SalesOrderDetailDto> GetSalesOrderDetails()
        {
            // Bu metot, liste görünümü için olduğu gibi kalabilir veya
            // daha performanslı olması için sadece gerekli alanları seçecek şekilde düzenlenebilir.
            var result = from so in _context.SalesOrders
                         select new SalesOrderDetailDto
                         {
                             Id = so.Id,
                             MHT = so.MHT,
                             Type = so.Type,
                             OrderDate = so.OrderDate,
                             BelgeNo = so.OrderNumber,
                             CariKoduUnvan = "Müşteri Kodu: " + so.CustomerId,
                             StokKodu = "Stok Kodu: " + so.ProductId,
                             StokAciklama = "Ürün Açıklaması Alanı",
                             Quantity = so.Quantity,
                             Unit = so.Unit,
                             IsCompleted = so.IsCompleted,
                             PendingQuantity = so.PendingQuantity,
                             BillableQuantity = so.BillableQuantity,
                             ShippedQuantity = so.ShippedQuantity,
                             LotNumber = so.LotNumber,
                             UnitPrice = so.UnitPrice,
                             Currency = so.Currency,
                             TotalAmount = so.TotalAmount
                         };
            return result.ToList();
        }

        // TEK BİR SİPARİŞİN TÜM DETAYLARINI GETİRMEK İÇİN GÜNCELLENMİŞ METOT
        public SalesOrderDetailDto GetSalesOrderDetailById(int salesOrderId)
        {
            // 1. EF Core'un Include() metodu ile ilgili sipariş satırlarını (LineItems) da yüklüyoruz.
            var salesOrderEntity = _context.SalesOrders
                                     .Include(so => so.LineItems) // İlişkili veriyi çekmek için
                                     .FirstOrDefault(so => so.Id == salesOrderId);

            if (salesOrderEntity == null)
            {
                return null;
            }

            // 2. Entity'den DTO'ya manuel olarak map'liyoruz.
            var dto = new SalesOrderDetailDto
            {
                Id = salesOrderEntity.Id,
                BelgeNo = salesOrderEntity.OrderNumber,
                CariKoduUnvan = "Müşteri Kodu: " + salesOrderEntity.CustomerId,
                OrderDate = salesOrderEntity.OrderDate,
                AraToplam = salesOrderEntity.TotalAmount, // Veya hesaplanacak
                                                          // ... diğer ana alanlar ...

                // 3. Sipariş satırlarını da LineItemDto'ya çevirip DTO'daki listeye ekliyoruz.
                LineItems = salesOrderEntity.LineItems.Select(line => new SalesOrderLineItemDto
                {
                    Id = line.Id,
                    Tip = "Malzeme",
                    Kodu = "STOK-" + line.ProductId,
                    Aciklama = line.Description,
                    Miktar = line.Quantity,
                    Birim = line.Unit,
                    BirimFiyat = line.UnitPrice,
                    Kdv = line.VatRate,
                    Tutar = line.TotalAmount
                }).ToList()
            };

            return dto;
        }
    }
}