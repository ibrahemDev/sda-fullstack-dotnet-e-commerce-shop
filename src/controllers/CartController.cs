using Microsoft.AspNetCore.Mvc;

using Store.Application.Services;
using Store.EntityFramework;
using Store.EntityFramework.Entities;
using Store.Helpers;
using Store.Models;

namespace Store.API.Controllers;
[ApiController]
[Route("/api/carts")]
public class CartController(AppDbContext appDbContext) : ControllerBase
{
    private readonly CartService _cartService = new(appDbContext);

    [HttpGet]
    public async Task<IActionResult> GetCarts([FromQuery] int page = 1, [FromQuery] int limit = 20)
    {
        List<Cart> carts = await _cartService.GetCarts();
        List<Cart> paginatedCarts = Paginate.Function(carts, page, limit);
        return Ok(new BaseResponseList<Cart>(paginatedCarts, true));
    }

    [HttpGet("{cartId}")]
    public async Task<IActionResult> GetCartById(string cartId)
    {
        if (!Guid.TryParse(cartId, out Guid cartIdGuid)) return BadRequest(new BaseResponse<object>(false, "Invalid Cart ID Format"));

        Cart? foundCarts = await _cartService.GetCartById(cartIdGuid);
        if (foundCarts is null) return NotFound();

        return Ok(new BaseResponse<Cart>(foundCarts, true));
    }

    [HttpPost]
    public async Task<IActionResult> CreateCart([FromBody] CartDto newCart)
    {
        Cart? createdCart = await _cartService.CreateCart(newCart);
        return Ok(new BaseResponse<Cart>(createdCart, true)); ;
        //CreatedAtAction(nameof(GetCartById), new { createdCart?.CartId }, createdCart);
    }

    [HttpPut("{cartId}")]
    public async Task<IActionResult> UpdateCart(string cartId, CartModel newCart)
    {
        if (!Guid.TryParse(cartId, out Guid cartIdGuid)) return BadRequest(new BaseResponse<object>(false, "Invalid Cart ID Format"));

        Cart? cartToBeUpdated = await _cartService.GetCartById(cartIdGuid);
        if (cartToBeUpdated is null) return NotFound();
        Cart? updatedCart = await _cartService.UpdateCart(cartIdGuid, newCart);

        return Ok(new BaseResponse<Cart>(updatedCart, true));
    }

    [HttpDelete("{cartId}")]
    public async Task<IActionResult> DeleteCart(string cartId)
    {
        if (!Guid.TryParse(cartId, out Guid cartIdGuid)) return BadRequest(new BaseResponse<object>(false, "Invalid Cart ID Format"));

        Cart? cartToDelete = await _cartService.GetCartById(cartIdGuid);
        if (cartToDelete is null || !await _cartService.DeleteCart(cartIdGuid)) return NotFound();

        return Ok(new BaseResponse<Cart>(cartToDelete, true));
    }
}
