using System;
using System.Collections.Generic;
using System.Text;

namespace Shva.Application.DTOs
{
    public class TransactionResponse
    {
        public int Id { get; set; }

        public string Region { get; set; } = string.Empty;

        public DateTime SubmittedUtcTime { get; set; }

        public DateTime LocalTime { get; set; }

        public string Status { get; set; } = string.Empty;
    }
}