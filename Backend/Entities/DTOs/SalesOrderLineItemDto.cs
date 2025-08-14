using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class SalesOrderLineItemDto : IDto
    {
        public int Id { get; set; }
        public string Tip { get; set; }
        public string Kodu { get; set; }
        public string Aciklama { get; set; }
        public decimal Miktar { get; set; }
        public string Birim { get; set; }
        public decimal BirimFiyat { get; set; }
        public decimal Kdv { get; set; }
        public decimal Tutar { get; set; }
    }
}
