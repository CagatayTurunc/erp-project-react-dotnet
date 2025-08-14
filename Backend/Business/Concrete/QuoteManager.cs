using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System.Collections.Generic;
using System.Linq;

namespace Business.Concrete
{
    public class QuoteManager : IQuoteService
    {
        private readonly IQuoteDal _quoteDal;

        public QuoteManager(IQuoteDal quoteDal)
        {
            _quoteDal = quoteDal;
        }

        public IDataResult<List<QuoteDetailDto>> GetAll()
        {
            var result = _quoteDal.GetQuoteDetails();
            return new SuccessDataResult<List<QuoteDetailDto>>(result, "Teklifler listelendi.");
        }

        public IResult DeleteById(int quoteId)
        {
            var quoteToDelete = _quoteDal.Get(q => q.Id == quoteId);
            if (quoteToDelete != null)
            {
                _quoteDal.Delete(quoteToDelete);
                return new SuccessResult("Teklif başarıyla silindi.");
            }
            return new ErrorResult("Teklif bulunamadı.");
        }

       
        public IDataResult<QuoteDetailDto> GetById(int quoteId)
        {
            
            // Bu, JOIN'lenmiş detaylı veriyi getirecektir.
            var result = _quoteDal.GetQuoteDetails().FirstOrDefault(q => q.Id == quoteId);
            if (result != null)
            {
                return new SuccessDataResult<QuoteDetailDto>(result, "Teklif detayı getirildi.");
            }
            return new ErrorDataResult<QuoteDetailDto>("Teklif bulunamadı.");
        }

        
        public IResult Add(Quote quote)
        {
            // Burada yeni teklif eklenmeden önce çeşitli iş kuralları çalıştırılabilir.
            // Örneğin, teklif numarasının benzersiz olup olmadığı kontrol edilebilir.

            _quoteDal.Add(quote);
            return new SuccessResult("Teklif başarıyla eklendi.");
        }

        
        public IResult Update(Quote quote)
        {
            _quoteDal.Update(quote);
            return new SuccessResult("Teklif başarıyla güncellendi.");
        }
    }
}