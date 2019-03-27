namespace DatingApp.API.Models
{
    public class Value
    {
        // EF is convention based, Id will be used as PK automatically, can be override
        public int Id { get; set; }
        
        public string Name { get; set; }
    }
}