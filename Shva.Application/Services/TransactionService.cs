using Shva.Application.DTOs;
using Shva.Domain.Entities;

namespace Shva.Application.Services;

public class TransactionService
{
    private readonly AppDbContext _context;

    public TransactionService(AppDbContext context)
    {
        _context = context;
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

        var status = isApproved ? "Approved" : "Rejected";

        var transaction = new Transaction
        {
            Region = request.Region,
            SubmittedUtcTime = request.SubmittedUtcTime,
            LocalTime = localTime,
            Status = status
        };

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return new TransactionResponse
        {
            Id = transaction.Id,
            Region = transaction.Region,
            SubmittedUtcTime = transaction.SubmittedUtcTime,
            LocalTime = transaction.LocalTime,
            Status = transaction.Status
        };
    }

    public List<TransactionResponse> GetApproved()
    {
        return _context.Transactions
            .Where(t => t.Status == "Approved")
            .Select(t => new TransactionResponse
            {
                Id = t.Id,
                Region = t.Region,
                SubmittedUtcTime = t.SubmittedUtcTime,
                LocalTime = t.LocalTime,
                Status = t.Status
            })
            .ToList();
    }

    private TimeZoneInfo GetTimeZone(string region)
    {
        return region switch
        {
            "Israel" => TimeZoneInfo.FindSystemTimeZoneById("Israel Standard Time"),
            "France" => TimeZoneInfo.FindSystemTimeZoneById("Romance Standard Time"),
            "USA" => TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"),
            "Japan" => TimeZoneInfo.FindSystemTimeZoneById("Tokyo Standard Time"),
            _ => throw new Exception("Invalid region")
        };
    }
}