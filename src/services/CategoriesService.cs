using Microsoft.EntityFrameworkCore;
using Store.EntityFramework;
using Store.EntityFramework.Entities;
using Store.Helpers;
using Store.Models;

namespace Store.Application.Services;
public class CategoriesService(AppDbContext appDbContext)
{
    private readonly AppDbContext _appDbContext = appDbContext;

    public async Task<PaginationResult<CategoryModel>> GetAllCategories(string? search, int page = 1, int limit = 20)
    {
        IQueryable<Category> q = _appDbContext.Categories;
        if (search != null)
        {
            q = q.Where(e => e.Name.Contains(search));
        }
        var totalCategoriesCount = await q.CountAsync();
        var skip = (page - 1) * limit;
        q = q.Skip(skip).Take(limit);
        IEnumerable<Category> list = await q.ToListAsync();
        IEnumerable<CategoryModel> categoryModelList = list.Select(e => CategoryModel.FromEntity(e));
        return new PaginationResult<CategoryModel>
        {
            Items = categoryModelList,
            TotalCount = totalCategoriesCount,
            PageNumber = page,
            PageSize = limit
        };
    }

    public async Task<CategoryModel?> GetCategoryById(Guid categoryId)
    {
        Category? category = await _appDbContext.Categories.Where(e => e.CategoryId == categoryId).SingleOrDefaultAsync();
        return category != null ? CategoryModel.FromEntity(category) : null;
    }

    public async Task<CategoryModel> CreateCategory(CategoryModel newCategory)
    {
        CategoryModel categoryModel = CategoryModel.Create(newCategory.Name, newCategory.Description);
        Category? category = await _appDbContext.Categories.Where(e => categoryModel.Name == e.Name).FirstOrDefaultAsync();
        if (category != null)
        {
            return CategoryModel.FromEntity(category);
        }

        Category _category = Category.Create(categoryModel);
        await _appDbContext.Categories.AddAsync(_category);
        await _appDbContext.SaveChangesAsync();
        return CategoryModel.FromEntity(_category);
    }

    public async Task<CategoryModel?> UpdateCategory(Guid categoryId, CategoryModel newCategory)
    {
        Category? p = await _appDbContext.Categories.Where(e => e.CategoryId == categoryId).FirstOrDefaultAsync();
        if (p == null)
        {
            return null;
        }

        p.Name = newCategory.Name;
        p.Description = newCategory.Description;
        _appDbContext.Categories.Update(p);
        await _appDbContext.SaveChangesAsync();
        return CategoryModel.FromEntity(p);
    }

    public async Task<bool> DeleteCategory(Guid categoryId)
    {
        int _deleted = await _appDbContext.Categories.Where(e => e.CategoryId == categoryId).ExecuteDeleteAsync();
        return _deleted == 1;
    }



}