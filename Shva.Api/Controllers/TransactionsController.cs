using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shva.Application.DTOs;
using Shva.Application.Services;

namespace Shva.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TransactionsController : ControllerBase
{
    private readonly TransactionService _transactionService;

    public TransactionsController(
        TransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpPost("simulate")]
    public async Task<ActionResult<TransactionResponse>> Simulate(
        [FromBody] CreateTransactionRequest request)
    {
        if (request is null)
        {
            return BadRequest("Request body is required.");
        }

        try
        {
            var result =
                await _transactionService.SimulateAsync(request);

            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("approved")]
    public async Task<ActionResult<List<TransactionResponse>>> GetApproved()
    {
        var result =
            await _transactionService.GetApprovedAsync();

        return Ok(result);
    }
}