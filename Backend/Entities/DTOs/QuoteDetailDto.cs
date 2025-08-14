using Core.Entities;
using System.Collections.Generic;
using Entities.DTOs;

public class QuoteDetailDto : IDto
{
    public int Id { get; set; }
    public string DocumentType { get; set; }
    public DateTime QuoteDate { get; set; }
    public string DocumentNumber { get; set; }
    public string CustomerCode { get; set; } // Müşteriden gelecek
    public string CustomerName { get; set; } // Müşteriden gelecek
    public string ApprovalStatus { get; set; }
    public string OrderStatus { get; set; }
    public string InvoiceStatus { get; set; }
    public string Description { get; set; }
    public decimal GrandTotal { get; set; }
    public List<QuoteLineItemDto> LineItems { get; set; }
    public decimal AraToplam { get; set; }
    public decimal KDV { get; set; }
}