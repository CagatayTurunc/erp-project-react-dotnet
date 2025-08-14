using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs; // SalesOrderDetailDto için bu using ifadesini ekleyin
using System.Collections.Generic;
using System.Linq;

namespace Business.Concrete
{
    public class SalesOrderManager : ISalesOrderService
    {
        private readonly ISalesOrderDal _salesOrderDal;

        public SalesOrderManager(ISalesOrderDal salesOrderDal)
        {
            _salesOrderDal = salesOrderDal;
        }

        // Add, Delete, Update, GetById metodları aynı kalıyor...
        // Sadece GetAll metodunu güncelliyoruz.

        public IDataResult<List<SalesOrderDetailDto>> GetAll(int pageNumber, int pageSize, string filterText)
        {
            // 1. Artık basit GetAll() yerine, DTO'ları getiren özel DAL metodumuzu çağırıyoruz.
            // Bu metot bize JOIN'lenmiş, ham ve tam bir liste verir.
            var result = _salesOrderDal.GetSalesOrderDetails();

            // 2. Filtrelemeyi bu tam liste üzerinden yapıyoruz.
            if (!string.IsNullOrEmpty(filterText))
            {
                result = result.Where(dto =>
                    dto.BelgeNo.ToLower().Contains(filterText.ToLower()) ||
                    dto.CariKoduUnvan.ToLower().Contains(filterText.ToLower())
                ).ToList();
            }

            // 3. Sayfalamayı filtrelenmiş liste üzerinden yapıyoruz.
            var pagedResult = result.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            // 4. Sonucu IDataResult<List<SalesOrderDetailDto>> olarak döndürüyoruz.
            return new SuccessDataResult<List<SalesOrderDetailDto>>(pagedResult);
        }

        public IDataResult<SalesOrderDetailDto> GetById(int salesOrderId)
        {
            var dto = _salesOrderDal.GetSalesOrderDetailById(salesOrderId);

            if (dto == null)
            {
                return new ErrorDataResult<SalesOrderDetailDto>("Sipariş bulunamadı.");
            }

            // 2. DTO'nun satırları üzerinden toplamları HESAPLIYORUZ.
            //    (Bu blok sizde eksik olabilir)
            if (dto.LineItems != null && dto.LineItems.Any())
            {
                // Ara Toplam = Tüm satırların (Miktar * BirimFiyat) toplamı
                dto.AraToplam = dto.LineItems.Sum(item => item.Miktar * item.BirimFiyat);

                // KDV = Ara Toplamın %20'si (örnek oran)
                dto.KDV = dto.AraToplam * 0.20m;

                // Genel Toplam = Ara Toplam + KDV
                dto.GenelToplam = dto.AraToplam + dto.KDV;
            }

            // 3. Hesaplamalarla zenginleştirilmiş DTO'yu frontend'e gönderiyoruz.
            return new SuccessDataResult<SalesOrderDetailDto>(dto);
        }

        public IResult Add(SalesOrder salesOrder)
        {
            _salesOrderDal.Add(salesOrder);
            return new SuccessResult("Satış siparişi başarıyla eklendi.");
        }

        public IResult Update(SalesOrder salesOrder)
        {
            _salesOrderDal.Update(salesOrder);
            return new SuccessResult("Satış siparişi başarıyla güncellendi.");
        }

        public IResult Delete(SalesOrder salesOrder)
        {
            _salesOrderDal.Delete(salesOrder);
            return new SuccessResult("Satış siparişi başarıyla silindi.");
        }

        public IResult DeleteById(int salesOrderId)
        {
            var orderToDelete = _salesOrderDal.Get(s => s.Id == salesOrderId);
            if (orderToDelete == null)
            {
                return new ErrorResult("Sipariş bulunamadı.");
            }

            _salesOrderDal.Delete(orderToDelete);
            return new SuccessResult("Sipariş başarıyla silindi.");
        }
    }
}