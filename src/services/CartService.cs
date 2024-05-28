using Microsoft.EntityFrameworkCore;
using Store.EntityFramework;

using Store.EntityFramework.Entities;
using Store.Models;

namespace Store.Application.Services;
public class CartService(AppDbContext appDbContext)
{
    private readonly AppDbContext _appDbContext = appDbContext;

    public async Task<List<Cart>> GetCarts()
    {
        return await _appDbContext.Carts
            .Include(c => c.Items)
            .ToListAsync();
    }
    public async Task<Cart?> GetCartById(Guid cartId)
    {
        return await _appDbContext.Carts.Include(c => c.Items).FirstOrDefaultAsync(c => c.CartId == cartId);
    }

    public async Task<Cart?> CreateCart(CartDto newCart)
    {
        var getCart = await _appDbContext.Carts.FirstOrDefaultAsync(c => c.UserId == newCart.UserId);
        if (getCart is not null) return getCart;

        var cart = new Cart
        {
            UserId = newCart.UserId,
        };

        await _appDbContext.Carts.AddAsync(cart);
        await _appDbContext.SaveChangesAsync();

        return cart;
    }

    public async Task<Cart?> UpdateCart(Guid cartId, CartModel updatedCart)
    {
        var cartToUpdate = await GetCartById(cartId);
        if (cartToUpdate is null) return null;

        await _appDbContext.SaveChangesAsync();

        return await Task.FromResult(cartToUpdate);
    }

    public async Task<bool> DeleteCart(Guid cartId)
    {
        var cartToDelete = await GetCartById(cartId);
        if (cartToDelete is null) return await Task.FromResult(false);

        _appDbContext.Carts.Remove(cartToDelete);
        await _appDbContext.SaveChangesAsync();

        return await Task.FromResult(true);
    }
}
