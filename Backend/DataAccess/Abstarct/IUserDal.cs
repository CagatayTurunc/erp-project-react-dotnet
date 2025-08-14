
using Core.DataAccess;
using Core.Entities.Concrete;
using Entities.Concrete;


namespace DataAccess.Abstract
{
    public interface IUserDal : IEntityRepository<User>
    {
        List<Core.Entities.Concrete.OperationClaim> GetClaims(User user);
    }
}


