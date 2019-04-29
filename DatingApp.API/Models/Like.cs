namespace DatingApp.API.Models
{
    public class Like
    {
        // primary key is going to be an combination of LikerId and LikeeId
        public int LikerId { get; set; }
        
        public int LikeeId { get; set; }
        
        public User Liker { get; set; }
        
        public User Likee { get; set; }
        
    }
}