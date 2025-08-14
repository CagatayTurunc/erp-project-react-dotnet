using Core.Entities.Concrete;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstarct
{
    public interface IUserService
    {
        List<Core.Entities.Concrete.OperationClaim> GetClaims(User user);
        void Add(User user);
        User GetByMail(string email);
    }
}
