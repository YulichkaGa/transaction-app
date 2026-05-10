using Shva.Application.DTOs;
using Shva.Application.Interfaces;
using Shva.Domain.Entities;

namespace Shva.Application.Services;

public class TransactionService
{
    private readonly ITransactionRepository _transactionRepository;

    public TransactionService(ITransactionRepository transactionRepository)
    {
        _transactionRepository = transactionRepository;
    }

    public async Task<TransactionResponse> SimulateAsync(CreateTransactionRequest request)
    {
        var timeZone = GetTimeZone(request.Region);

        var localTime = TimeZoneInfo.ConvertTimeFromUtc(
            request.SubmittedUtcTime,
            timeZone
        );

        var isApproved = localTime.TimeOfDay >= TimeSpan.FromHours(8)
                         && localTime.TimeOfDay <= TimeSpan.FromHours(18);

        var transaction = new Transaction
        {
            Region = request.Region,
            SubmittedUtcTime = request.SubmittedUtcTime,
            LocalTime = localTime,
            Status = isApproved ? "Approved" : "Rejected",
            CreatedAt = DateTime.UtcNow
        };

        await _transactionRepository.AddAsync(transaction);

        return new TransactionResponse
        {
            Id = transaction.Id,
            Region = transaction.Region,
            SubmittedUtcTime = transaction.SubmittedUtcTime,
            LocalTime = transaction.LocalTime,
            Status = transaction.Status
        };
    }

    public async Task<List<TransactionResponse>> GetApprovedAsync()
    {
        var transactions = await _transactionRepository.GetApprovedAsync();

        return transactions.Select(transaction => new TransactionResponse
        {
            Id = transaction.Id,
            Region = transaction.Region,
            SubmittedUtcTime = transaction.SubmittedUtcTime,
            LocalTime = transaction.LocalTime,
            Status = transaction.Status
        }).ToList();
    }

    private static TimeZoneInfo GetTimeZone(string region)
    {
        return region switch
        {
            "Israel" => TimeZoneInfo.FindSystemTimeZoneById("Israel Standard Time"),
            "France" => TimeZoneInfo.FindSystemTimeZoneById("Romance Standard Time"),
            "USA" => TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"),
            "Japan" => TimeZoneInfo.FindSystemTimeZoneById("Tokyo Standard Time"),
            _ => throw new ArgumentException("Invalid region")
        };
    }
}