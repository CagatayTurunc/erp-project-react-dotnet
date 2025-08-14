
using Business.Abstarct; // veya Abstract
using Core.Entities.Concrete;
using DataAccess.Abstract;
using Entities.Concrete;
using System.Collections.Generic;

namespace Business.Concrete
{
    public class UserManager : IUserService
    {
        private readonly IUserDal _userDal;

        public UserManager(IUserDal userDal)
        {
            _userDal = userDal;
        }

        public void Add(User user)
        {
            _userDal.Add(user);
        }

        public User GetByMail(string email)
        {
            return _userDal.Get(u => u.Email == email);
        }

        public List<Core.Entities.Concrete.OperationClaim> GetClaims(User user)
        {
            return _userDal.GetClaims(user);
        }

        
    }
}