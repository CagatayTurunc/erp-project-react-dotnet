using Core.Entities;

namespace Entities.Concrete
{
    public class Customer : IEntity
    {
        public int Id { get; set; }
        public string CustomerCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
    }
}
