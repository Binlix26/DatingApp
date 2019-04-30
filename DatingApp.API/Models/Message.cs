using System;

namespace DatingApp.API.Models
{
    public class Message
    {
        public int Id { get; set; }

        public int SenderId { get; set; }

        public User Sender { get; set; }

        public int RecipientId { get; set; }

        public User Recipient { get; set; }
        
        public string Content { get; set; }
        
        public bool IsRead { get; set; }
        
        // set to null if it is not read ( default value is 2000 years ago)
        public DateTime? DateRead { get; set; } 
        
        public DateTime MessageSent { get; set; }
        
        public bool SenderDeleted { get; set; }
        
        public bool RecipientDeleted { get; set; }
    }
}