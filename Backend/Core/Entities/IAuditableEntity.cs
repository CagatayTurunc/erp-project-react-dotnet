using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    // Bu arayüz, bir varlığın denetim alanlarına sahip olduğunu belirtir.
    public interface IAuditableEntity
    {
        
        public DateTime CreatedDate { get; set; }
        public int CreatedByUserId { get; set; }

        public DateTime? ModifiedDate { get; set; } // Nullable, çünkü ilk eklenirken null olabilir.
        public int? ModifiedByUserId { get; set; }  // Nullable
    }
}
