using Core.DataAccess; // IEntityRepository için
using Entities.Concrete;
using Entities.DTOs; // SalesOrder için

namespace DataAccess.Abstract
{
    // SalesOrder için özel bir Dal arayüzü oluşturuyoruz.
    // IEntityRepository<SalesOrder>'dan miras alarak temel Add, Update, Delete, Get, GetAll
    // gibi tüm metodları otomatik olarak kazanmış oluyoruz.
    public interface ISalesOrderDal : IEntityRepository<SalesOrder>
    {
        // Yeni DTO'muzu getirecek metot
        List<SalesOrderDetailDto> GetSalesOrderDetails();
        SalesOrderDetailDto GetSalesOrderDetailById(int salesOrderId);
    }
}