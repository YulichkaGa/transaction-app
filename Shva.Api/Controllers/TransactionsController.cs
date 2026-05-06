using Microsoft.AspNetCore.Mvc;
using Shva.Application.DTOs;
using Shva.Application.Services;

namespace Shva.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly TransactionService _service;

    public TransactionsController(TransactionService service)
    {
        _service = service;
    }

    [HttpPost("simulate")]
    public IActionResult Simulate([FromBody] CreateTransactionRequest request)
    {
        var result = _service.Simulate(request);

        return Ok(result);
    }
}