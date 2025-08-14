using Business.Abstract;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class SalesOrdersController : ControllerBase
{
    private readonly ISalesOrderService _salesOrderService;

    public SalesOrdersController(ISalesOrderService salesOrderService)
    {
        _salesOrderService = salesOrderService;
    }
    [HttpGet("getbyid/{id}")]
    public IActionResult GetById(int id)
    {
        var result = _salesOrderService.GetById(id);
        if (result.Success)
        {
            return Ok(result);
        }
        return BadRequest(result);
    }
    [HttpDelete("delete/{id}")]
    public IActionResult Delete(int id)
    {
        var result = _salesOrderService.DeleteById(id);
        if (result.Success)
        {
            return Ok(result);
        }
        return BadRequest(result);
    }
    [HttpGet("getall")]
    public IActionResult GetAll([FromQuery] int pageNumber, [FromQuery] int pageSize, [FromQuery] string filterText = "")
    {
        var result = _salesOrderService.GetAll(pageNumber, pageSize, filterText);
        if (result.Success)
        {
            return Ok(result);
        }
        return BadRequest(result);
    }

    // Add, Update, Delete gibi diğer endpoint'ler de buraya eklenecek.
}