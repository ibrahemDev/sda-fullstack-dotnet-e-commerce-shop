using Store.EntityFramework.Entities;

namespace Store.Dtos;

public class UserDto()
{
    public Guid UserId { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
    public required string FirstName { get; set; }
    public string? LastName { get; set; } = string.Empty;
    public DateTime? DateOfBirth { get; set; } = default;
    public int? Role { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    public static UserDto FromUser(User p)
    {
        return new UserDto
        {
            UserId = p.UserId,
            Email = p.Email,
            PhoneNumber = p.PhoneNumber,

            FirstName = p.FirstName,

            LastName = p.LastName,
            DateOfBirth = p.DateOfBirth,
            Role = p.Role,
            CreatedAt = p.CreatedAt


        };
    }
}