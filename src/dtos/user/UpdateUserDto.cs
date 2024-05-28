using System.ComponentModel.DataAnnotations;

namespace Store.Dtos;

public class UpdateUserDto()
{
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    [MaxLength(100, ErrorMessage = "Email can be at most 100 characters long.")]
    public required string Email { get; set; }

    [Required(ErrorMessage = "Phone number is required.")]
    [RegularExpression(@"^\(?\d{10}$", ErrorMessage = "Invalid phone number format.")]
    public required string PhoneNumber { get; set; }

    [Required(ErrorMessage = "First name is required.")]
    [MinLength(2, ErrorMessage = "Name must be at least 2 characters long.")]
    [MaxLength(20, ErrorMessage = "Name must be at most 20 characters long.")]
    public required string FirstName { get; set; }

    [MinLength(2, ErrorMessage = "Name must be at least 2 characters long.")]
    [MaxLength(20, ErrorMessage = "Name must be at most 20 characters long.")]
    public string? LastName { get; set; } = string.Empty;
    public string? DateOfBirth { get; set; } = null;
    public int? Role { get; set; } = 0;
}