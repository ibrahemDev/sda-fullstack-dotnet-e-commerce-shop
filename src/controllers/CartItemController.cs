using Microsoft.AspNetCore.Mvc;

using Store.Application.Services;
using Store.EntityFramework.Entities;
using Store.EntityFramework;
using Store.Helpers;
using Store.Models;

namespace Store.API.Controllers;
[ApiController]
[Route("/api/cartitems")]
public class CartItemController(AppDbContext appDbContext) : ControllerBase
{
    private readonly CartItemService _cartItemService = new(appDbContext);

    [HttpGet]
    public async Task<IActionResult> GetCartItems([FromQuery] int page = 1, [FromQuery] int limit = 20)
    {
        List<CartItem> cartItems = await _cartItemService.GetCartItems();
        List<CartItem> paginatedCartItems = Paginate.Function(cartItems, page, limit);
        return Ok(new BaseResponseList<CartItem>(paginatedCartItems, true));
    }

    [HttpGet("{cartItemId}")]
    public async Task<IActionResult> GetCartItemsById(string cartItemId)
    {
        if (!Guid.TryParse(cartItemId, out Guid cartItemIdGuid)) return BadRequest(new BaseResponse<object>(false, "Invalid CartItem ID Format"));

        CartItem? foundCartItems = await _cartItemService.GetCartItemById(cartItemIdGuid);
        if (foundCartItems is null) return NotFound();

        return Ok(new BaseResponse<CartItem>(foundCartItems, true));
    }

    [HttpPost]
    public async Task<IActionResult> CreateCartItem(CartItemModel newCartItem)
    {
        CartItem? createdCartItem = await _cartItemService.CreateCartItems(newCartItem);
        if (createdCartItem is null) return BadRequest();

        return Ok(new BaseResponse<CartItem>(createdCartItem, true));
        //return CreatedAtAction(nameof(GetCartItemsById), new { createdCartItem?.CartItemId }, createdCartItem);
    }

    [HttpPut("{cartItemId}")]
    public async Task<IActionResult> UpdateCartItem(string cartItemId, CartItemModel newCartItem)
    {
        if (!Guid.TryParse(cartItemId, out Guid cartItemIdGuid)) return BadRequest(new BaseResponse<object>(false, "Invalid CartItem ID Format"));

        CartItem? cartItemToBeUpdated = await _cartItemService.GetCartItemById(cartItemIdGuid);
        if (cartItemToBeUpdated is null) return NotFound();
        CartItem? updatedCartItem = await _cartItemService.UpdateCartItems(cartItemIdGuid, newCartItem);

        return Ok(new BaseResponse<CartItem>(updatedCartItem, true));
    }

    [HttpDelete("{cartItemId}")]
    public async Task<IActionResult> DeleteCartItem(string cartItemId)
    {
        if (!Guid.TryParse(cartItemId, out Guid cartItemIdGuid)) return BadRequest(new BaseResponse<object>(false, "Invalid CartItem ID Format"));

        CartItem? cartItemToDelete = await _cartItemService.GetCartItemById(cartItemIdGuid);
        if (cartItemToDelete is null || !await _cartItemService.DeleteCartItem(cartItemIdGuid)) return NotFound();

        return Ok(new BaseResponse<CartItem>(cartItemToDelete, true));
    }
}
