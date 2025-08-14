using Autofac;
using Business.Abstarct;
using Business.Abstract;
using Business.Concrete;
using Core.Utilities.Security.JWT;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;

namespace Business.DependencyResolvers.Autofac
{
    public class AutofacBusinessModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // AUTH & USER
            builder.RegisterType<AuthManager>().As<IAuthService>().SingleInstance();
            builder.RegisterType<UserManager>().As<IUserService>().SingleInstance();
            builder.RegisterType<EfUserDal>().As<IUserDal>().SingleInstance();

            // SALES ORDERS
            builder.RegisterType<SalesOrderManager>().As<ISalesOrderService>().SingleInstance();
            builder.RegisterType<EfSalesOrderDal>().As<ISalesOrderDal>().SingleInstance();

            // QUOTES (EKSİK OLAN KISIM)
            builder.RegisterType<QuoteManager>().As<IQuoteService>().SingleInstance();
            builder.RegisterType<EfQuoteDal>().As<IQuoteDal>().SingleInstance();

            // TOKEN HELPER
            builder.RegisterType<JwtHelper>().As<ITokenHelper>().SingleInstance();
        }
    }
}