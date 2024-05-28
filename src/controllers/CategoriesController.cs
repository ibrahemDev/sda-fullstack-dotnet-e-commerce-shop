using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Store.Application.Services;
using Store.EntityFramework;
using Store.Helpers;
using Store.Helpers.Enums;
using Store.Models;

namespace Store.API.Controllers;
[ApiController]
[Route("/api/categories")]
public class CategoriesController(CategoriesService categoriesService, IMapper mapper, AppDbContext appDbContext) : ControllerBase
{
    private readonly CategoriesService _categoriesService = categoriesService;
    private readonly AuthSerivce _authService = new(appDbContext, mapper);

    [HttpGet]
    public async Task<IActionResult> GetAllCategories([FromQuery] string? q, [FromQuery] int page = 1, [FromQuery] int limit = 20)
    {
        try
        {
            if (page <= 0)
            {
                return BadRequest(
                    new BaseResponse<object>(success: false, msg: "page most be more then 0 ")
                );
            }
            PaginationResult<CategoryModel> categories = await _categoriesService.GetAllCategories(q, page, limit);
            return Ok(new BaseResponse<PaginationResult<CategoryModel>>(categories, true));
        }
        catch (Exception)
        {
            return StatusCode(500);
        }

    }

    [HttpGet("{categoryId}")]
    public async Task<IActionResult> GetCategory(string categoryId)
    {
        try
        {
            if (!Guid.TryParse(categoryId, out Guid categoryIdGuid))
            {
                return BadRequest(new BaseResponse<object>(false, "Invalid category ID Format"));
            }

            var category = await _categoriesService.GetCategoryById(categoryIdGuid);
            if (category == null)
            {
                return NotFound();
            }

            else
            {
                return Ok(new BaseResponse<CategoryModel>(category, true));
            }
        }
        catch (Exception)
        {
            return StatusCode(500);
        }

    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)] CategoryModel newCategory)
    {
        try
        {
            var userIdString = _authService.Authenticate(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, UserRole.Admin);
            if (userIdString != null) return Unauthorized(new BaseResponse<string>(false, userIdString));

            var createdCategory = await _categoriesService.CreateCategory(newCategory);
            return CreatedAtAction(nameof(GetCategory), new { categoryId = createdCategory.CategoryId }, createdCategory);
        }
        catch (Exception)
        {
            return StatusCode(500);
        }

    }

    [Authorize]
    [HttpPut("{categoryId}")]
    public async Task<IActionResult> UpdateCategory(string categoryId, [FromBody] CategoryModel updateCategory)
    {
        try
        {
            var userIdString = _authService.Authenticate(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, UserRole.Admin);
            if (userIdString != null) return Unauthorized(new BaseResponse<string>(false, userIdString));
            if (!Guid.TryParse(categoryId, out Guid categoryIdGuid))
                return BadRequest("Invalid category ID Format");

            if (updateCategory == null)
                return BadRequest(ModelState);

            var category = await _categoriesService.UpdateCategory(categoryIdGuid, updateCategory);
            if (category == null)
                return NotFound();

            return Ok(category);
        }
        catch (Exception)
        {
            return StatusCode(500);
        }

    }

    [Authorize]
    [HttpDelete("{categoryId}")]
    public async Task<IActionResult> DeleteCategory(string categoryId)
    {
        try
        {
            var userIdString = _authService.Authenticate(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, UserRole.Admin);
            if (userIdString != null) return Unauthorized(new BaseResponse<string>(false, userIdString));
            if (!Guid.TryParse(categoryId, out Guid categoryIdGuid))
            {
                return BadRequest("Invalid category ID Format");
            }
            var result = await _categoriesService.DeleteCategory(categoryIdGuid);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500);
        }

    }


}