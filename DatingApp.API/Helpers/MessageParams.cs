namespace DatingApp.API.Helpers
{
    public class MessageParams
    {
        private const int MaxPageSize = 50;

        public int PageNumber { get; set; } = 1;

        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > 10) ? MaxPageSize : value;
        }

        public int UserId { get; set; }

        public string MessageContainer { get; set; } = "Unread";
    }
}