using Core.DataAccess;
using Entities.Concrete;
using Entities.DTOs;
using System.Collections.Generic;

namespace DataAccess.Abstract
{
    public interface IQuoteDal : IEntityRepository<Quote>
    {
        List<QuoteDetailDto> GetQuoteDetails();
        QuoteDetailDto GetQuoteDetailById(int quoteId);
    }
}