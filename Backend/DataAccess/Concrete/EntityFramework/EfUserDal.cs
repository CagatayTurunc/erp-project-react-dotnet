// DataAccess/Concrete/EntityFramework/EfUserDal.cs
using Core.Entities.Concrete;
using DataAccess.Abstract;
using System.Collections.Generic;
using System.Linq;


namespace DataAccess.Concrete.EntityFramework
{
    public class EfUserDal : EfEntityRepositoryBase<User, NorthwindContext>, IUserDal
    {
        public EfUserDal(NorthwindContext context) : base(context)
        {
        }

        public List<OperationClaim> GetClaims(User user)
        {


            var result = from operationClaim in _context.OperationClaims
                         join userOperationClaim in _context.UserOperationClaims
                             on operationClaim.Id equals userOperationClaim.OperationClaimId
                         where userOperationClaim.UserId == user.Id
                         select new OperationClaim { Id = operationClaim.Id, Name = operationClaim.Name };

            return result.ToList();

        }

        //List<Core.Entities.Concrete.OperationClaim> IUserDal.GetClaims(User user)
        //{
        //    throw new NotImplementedException();
        //}
    }
}