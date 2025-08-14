using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using System.Collections.Generic;

namespace Business.Abstract
{
    public interface IQuoteService
    {
        IDataResult<List<QuoteDetailDto>> GetAll(); // Şimdilik basit bir GetAll yeterli
        IDataResult<QuoteDetailDto> GetById(int quoteId);
        IResult Add(Quote quote);
        IResult Update(Quote quote);
        IResult DeleteById(int quoteId);
    }
}