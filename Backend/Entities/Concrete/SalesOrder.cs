using Core.Entities;
using Entities.Concrete.Enums; // Enum'ı tanıyabilmesi için bu satır önemli
using System;

namespace Entities.Concrete
{
    public class SalesOrder : IEntity, IAuditableEntity
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public DateTime OrderDate { get; set; }
        public string MHT { get; set; }
        public string Type { get; set; }
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

        // Denetim Alanları (Auditing)
        public DateTime CreatedDate { get; set; }
        public int CreatedByUserId { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedByUserId { get; set; }

        // Diğer Alanlar
        public DateTime? ValidUntil { get; set; }
        public decimal ProspectAmount { get; set; }
        public SalesOrderStatus Status { get; set; }
        public List<SalesOrderLineItem> LineItems { get; set; }
    }
}