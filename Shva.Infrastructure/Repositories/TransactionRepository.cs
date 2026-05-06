using Microsoft.EntityFrameworkCore;
using Shva.Application.Interfaces;
using Shva.Domain.Entities;
using Shva.Infrastructure.Data;

namespace Shva.Infrastructure.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly AppDbContext _context;

    public TransactionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Transaction transaction)
    {
        ArgumentNullException.ThrowIfNull(transaction);

        try
        {
            await _context.Transactions.AddAsync(transaction);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Failed to save transaction to database.", ex);
        }
    }

    public async Task<List<Transaction>> GetApprovedAsync()
    {
        try
        {
            return await _context.Transactions
                .Where(transaction => transaction.Status == "Approved")
                .OrderByDescending(transaction => transaction.CreatedAt)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Failed to get approved transactions from database.", ex);
        }
    }
}