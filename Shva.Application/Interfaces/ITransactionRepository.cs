using Shva.Domain.Entities;

namespace Shva.Application.Interfaces;

public interface ITransactionRepository
{
    Task AddAsync(Transaction transaction);

    Task<List<Transaction>> GetApprovedAsync();
}