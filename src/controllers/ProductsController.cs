using Microsoft.AspNetCore.Mvc;

using Store.Application.Services;
using Store.EntityFramework.Entities;
using Store.EntityFramework;
using Store.Helpers;
using Store.Models;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using System.Security.Claims;
using Store.Helpers.Enums;

namespace Store.API.Controllers;
[ApiController]
[Route("/api/products")]
public class ProductsController(AppDbContext appDbContext, IMapper mapper) : ControllerBase
{
    private readonly ProductService _productService = new(appDbContext);
    private readonly AuthSerivce _authService = new(appDbContext, mapper);


    [HttpGet]
    public async Task<IActionResult> GetAllProducts([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int limit = 50, [FromQuery] string sortBy = "Name", [FromQuery] string dir = "Asc", [FromQuery] string? byCategory = null)
    {
        PaginationResult<Product> products = await _productService.GetAllProducts(search, page, limit, sortBy, dir, byCategory);
        return Ok(new BaseResponse<PaginationResult<Product>>(products, true));
    }

    [HttpGet("{productId}")]
    public async Task<IActionResult> GetProductById(string productId)
    {
        if (!Guid.TryParse(productId, out Guid productIdGuid)) return BadRequest(new BaseResponse<object>(false, "Invalid product ID Format"));
        var product = await _productService.GetProductById(productIdGuid);
        if (product is null) return NotFound();
        return Ok(new BaseResponse<Product>(product, true));
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateProduct(ProductModel newProduct)
    {
        var userIdString = _authService.Authenticate(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, UserRole.Admin);
        if (userIdString != null) return Unauthorized(new BaseResponse<string>(false, userIdString));

        var createdProduct = await _productService.CreateProduct(newProduct);
        return CreatedAtAction(nameof(GetProductById), new { createdProduct?.ProductId }, createdProduct);
    }

    [Authorize]
    [HttpPut("{productId}")]
    public async Task<IActionResult> UpdateProduct(string productId, ProductModel updateProduct)
    {
        var userIdString = _authService.Authenticate(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, UserRole.Admin);
        if (userIdString != null) return Unauthorized(new BaseResponse<string>(false, userIdString));


        if (!Guid.TryParse(productId, out Guid productIdGuid)) return BadRequest(new BaseResponse<object>(null, false, "Invalid product ID Format"));

        Product? productToUpdate = await _productService.GetProductById(productIdGuid);
        if (productToUpdate is null) return BadRequest(ModelState);

        Product? updatedProduct = await _productService.UpdateProduct(productIdGuid, updateProduct);

        return Ok(new BaseResponse<Product>(updatedProduct, true));


    }

    [Authorize]
    [HttpDelete("{productId}")]
    public async Task<IActionResult> DeleteProduct(string productId)
    {
        var userIdString = _authService.Authenticate(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, UserRole.Admin);
        if (userIdString != null) return Unauthorized(new BaseResponse<string>(false, userIdString));
        if (!Guid.TryParse(productId, out Guid productIdGuid)) return BadRequest("Invalid product ID Format");

        Product? productToDelete = await _productService.GetProductById(productIdGuid);
        var result = await _productService.DeleteProduct(productIdGuid);
        if (!result) return NotFound();

        return Ok(new BaseResponse<Product>(productToDelete, true));
    }
}