using Core.Utilities.Results; // IDataResult ve IResult için
using Entities.Concrete; // SalesOrder için
using Entities.DTOs;
using System.Collections.Generic;

namespace Business.Abstract
{
    public interface ISalesOrderService
    {
        // Tüm siparişleri getirirken sayfalama ve filtreleme parametreleri alacak
        IDataResult<List<SalesOrderDetailDto>> GetAll(int pageNumber, int pageSize, string filterText);

        IDataResult<SalesOrderDetailDto> GetById(int salesOrderId);


        IResult Add(SalesOrder salesOrder);
        IResult Update(SalesOrder salesOrder);
        IResult Delete(SalesOrder salesOrder);
        IResult DeleteById(int salesOrderId); 

    }
}