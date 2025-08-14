using Business.Abstract;
using Microsoft.AspNetCore.Mvc;
using Entities.Concrete;
namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private readonly IQuoteService _quoteService;

        public QuotesController(IQuoteService quoteService)
        {
            _quoteService = quoteService;
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _quoteService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpGet("getbyid/{id}")]
        public IActionResult GetById(int id)
        {
            var result = _quoteService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var result = _quoteService.DeleteById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // Diğer endpoint'ler (GetById, Add, Update) buraya eklenebilir.
    }
}