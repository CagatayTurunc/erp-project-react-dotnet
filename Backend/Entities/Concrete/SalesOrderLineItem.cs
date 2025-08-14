using Core.Entities;

namespace Entities.Concrete
{
    public class SalesOrderLineItem : IEntity
    {
        public int Id { get; set; }
        public int SalesOrderId { get; set; } // Hangi siparişe ait olduğunu belirtir (Foreign Key)
        public int ProductId { get; set; }
        public string Description { get; set; }
        public decimal Quantity { get; set; }
        public string Unit { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal VatRate { get; set; } // KDV Oranı
        public decimal TotalAmount { get; set; }
    }
}