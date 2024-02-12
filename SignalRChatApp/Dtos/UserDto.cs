using System.ComponentModel.DataAnnotations;

namespace SignalRChatApp.Dtos
{
    public class UserDto
    {
        [Required]
        [StringLength(15, MinimumLength =3, ErrorMessage ="Name must be at least {2}, and maximum {1} charecters")]
        public int Name { get; set; }
        
    }
}
