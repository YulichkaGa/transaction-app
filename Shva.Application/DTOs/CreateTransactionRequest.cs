using System;
using System.Collections.Generic;
using System.Text;

namespace Shva.Application.DTOs
{
    public class CreateTransactionRequest
    {
        public string Region { get; set; } = string.Empty;

        public DateTime SubmittedUtcTime { get; set; }
    }
}