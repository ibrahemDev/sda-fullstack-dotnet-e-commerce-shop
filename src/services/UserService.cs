using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Store.Dtos;
using Store.EntityFramework;

using Store.EntityFramework.Entities;
using Store.Helpers;

namespace Store.Application.Services;
public class UserService(AppDbContext appDbContext, IMapper mapper, IPasswordHasher<User> passwordHasher)
{
    private readonly AppDbContext _appDbContext = appDbContext;
    private readonly IPasswordHasher<User> _passwordHasher = passwordHasher;
    private readonly IMapper _mapper = mapper;

    public async Task<PaginationResult<UserDto>> GetUsers(string? search, int page = 1, int limit = 20)
    {
        IQueryable<User> q = _appDbContext.Users;
        if (search != null)
        {
            q = q
            .Where(e =>
               e.Email.ToLower().Contains(search.ToLower()) ||
               e.FirstName.ToLower().Contains(search.ToLower()) ||
               //e.LastName.ToLower().Contains(search.ToLower()) ||
               e.PhoneNumber.ToLower().Contains(search.ToLower()) ||
               e.CreatedAt.ToString().ToLower().Contains(search.ToLower())
        //e.DateOfBirth.ToString().ToLower().Contains(search.ToLower())
        );
            /*.Where(e => e.Email.ToLower().Contains(search.ToLower()))
            .Where(e => e.CreatedAt.ToString().ToLower().Contains(search.ToLower()))
            .Where(e => (e.DateOfBirth.ToString() ?? "").ToLower().Contains(search.ToLower()))
            .Where(e => e.FirstName.ToLower().Contains(search.ToLower()))
            .Where(e => e.LastName.ToLower().Contains(search.ToLower()))
            .Where(e => e.PhoneNumber.ToLower().Contains(search.ToLower()));*/
        }
        q = q.OrderBy(e => e.UserId);

        var totalProductsCount = await q.CountAsync();
        var skip = (page - 1) * limit;
        q = q.Skip(skip).Take(limit);
        IEnumerable<User> list = await q.ToListAsync();
        return new PaginationResult<UserDto>
        {
            Items = (await q.ToListAsync()).Select(_mapper.Map<UserDto>),
            TotalCount = totalProductsCount,
            PageNumber = page,
            PageSize = limit
        };

    }

    public async Task<User?> GetUserById(Guid userId, Boolean clearPass = true)
    {
#pragma warning disable CS8625 // Cannot convert null literal to non-nullable reference type.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
        /* User? user = await _appDbContext.Users
             .Include(user => user.Cart)
                 .ThenInclude(cart => cart.Items)
                 .ThenInclude(cartItem => cartItem.Product)
             //.ThenInclude(CartItem => CartItem.Product)
             .Include(user => user.Addresses)
             .Include(user => user.PaymentMethods)
             .Include(user => user.Orders)
             .Include(user => user.ShoppingLists)
             .Include(user => user.ProductReviews)
             .FirstOrDefaultAsync(user => user.UserId == userId);*/
        User? user = await _appDbContext.Users
.Include(user => user.Cart)
    .ThenInclude(cart => cart.Items)
    .ThenInclude(cartItem => cartItem.Product)
.Include(user => user.Addresses)
.Include(user => user.PaymentMethods)
.Include(user => user.Orders)
.Include(user => user.ShoppingLists)
.Include(user => user.ProductReviews)
.FirstOrDefaultAsync(user => user.UserId == userId);
        if (clearPass)
        {
            user.Password = null;
        }

        return await Task.FromResult(user);
    }

    public async Task<UserDto?> CreateUser(RegisterDto newUser)
    {
#pragma warning disable CS8625 // Cannot convert null literal to non-nullable reference type.
        User user = new()
        {
            Email = newUser.Email,
            Password = _passwordHasher.HashPassword(null, newUser.Password),
            PhoneNumber = newUser.PhoneNumber,
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            DateOfBirth = newUser.DateOfBirth,
            Role = newUser.Role,
            CreatedAt = newUser.CreatedAt
        };
#pragma warning restore CS8625 // Cannot convert null literal to non-nullable reference type.

        await _appDbContext.Users.AddAsync(user);
        await _appDbContext.SaveChangesAsync();

        Cart cart = new()
        {
            UserId = user.UserId
        };

        await _appDbContext.Carts.AddAsync(cart);
        await _appDbContext.SaveChangesAsync();

        UserDto DtoUser = _mapper.Map<UserDto>(user);

        return await Task.FromResult(DtoUser);
    }

    public async Task<UserDto?> UpdateUser(Guid userId, UpdateUserDto updatedUser)
    {

        //User? userToUpdate = await _appDbContext.Users.FirstOrDefaultAsync(user => user.UserId == userId);
        User? userToUpdate = await GetUserById(userId, false);
        if (userToUpdate is null) return null;

        userToUpdate.Email = updatedUser.Email;
        userToUpdate.PhoneNumber = updatedUser.PhoneNumber;
        userToUpdate.FirstName = updatedUser.FirstName;
        userToUpdate.LastName = updatedUser.LastName;

        DateTime dateOfBirth;
        if (DateTime.TryParse(updatedUser.DateOfBirth, out dateOfBirth))
        {
            userToUpdate.DateOfBirth = dateOfBirth.ToUniversalTime();
        }

        userToUpdate.Role = updatedUser.Role ?? 0;
        await _appDbContext.SaveChangesAsync();

        return await Task.FromResult(_mapper.Map<UserDto>(userToUpdate)

            /*UserDto.FromUser(userToUpdate)*/


            /**/);
    }

    public async Task<DeleteUserDto?> DeleteUser(Guid userId)
    {
        User? userToDelete = await _appDbContext.Users.FirstOrDefaultAsync(user => user.UserId == userId);
        if (userToDelete is null) return null;

        _appDbContext.Users.Remove(userToDelete);
        await _appDbContext.SaveChangesAsync();

        DeleteUserDto? deletedUser = _mapper.Map<DeleteUserDto>(userToDelete);

        return await Task.FromResult(deletedUser);
    }
}
