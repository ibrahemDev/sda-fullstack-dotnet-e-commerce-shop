using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Store.EntityFramework;
using Store.EntityFramework.Entities;
using Store.Helpers;
using Store.Models;

namespace Store.Application.Services;
public class ProductService(AppDbContext appDbContext)
{
    private readonly AppDbContext _appDbContext = appDbContext;

    public async Task<PaginationResult<Product>> GetAllProducts(string? search, int page = 1, int limit = 20, string sortBy = "Name", string dir = "Asc", string? byCategory = null)
    {
        IQueryable<Product> q = _appDbContext.Products;
        if (search != null)
        {
            q = q.Where(e => e.Name.ToLower().Contains(search.ToLower()));
        }

        if (byCategory != null)
        {
            Category? category = await _appDbContext.Categories.Where(e => e.Name.ToLower() == byCategory.ToLower()).SingleOrDefaultAsync();
            if (category != null)
            {
                q = q.Include(e => e.ProductCategoryList)
     .Where(e => e.ProductCategoryList != null && e.ProductCategoryList.Any(pc => pc.CategoryId == category.CategoryId));
            }

        }
        else
        {
            q = q.Include(e => e.CategoryList);
        }





        if (dir.ToLowerInvariant() == "desc")
        {
            switch (sortBy.ToLower())
            {
                case "name":
                    q = q.OrderByDescending(p => p.Name);
                    break;
                case "price":
                    q = q.OrderByDescending(p => p.Price);
                    break;
                case "category":
                    q = q.OrderByDescending(c => !c.CategoryList.IsNullOrEmpty()).ThenBy(c => c.CategoryList!.First().Name);
                    break;
                case "stock":
                    q = q.OrderByDescending(p => p.Stock);
                    break;
            }
        }
        else
        {
            switch (sortBy.ToLower())
            {
                case "name":
                    q = q.OrderBy(p => p.Name);
                    break;
                case "price":
                    q = q.OrderBy(p => p.Price);
                    break;
                case "category":
                    q = q.OrderBy(c => !c.CategoryList.IsNullOrEmpty()).ThenBy(c => c.CategoryList!.First().Name);
                    break;
                case "stock":
                    q = q.OrderBy(p => p.Stock);
                    break;
            }
        }
        var totalProductsCount = await q.CountAsync();
        var skip = (page - 1) * limit;
        q = q.Skip(skip).Take(limit);
        IEnumerable<Product> list = await q.ToListAsync();
        list = list.Select(e => Product.Create(e, e.CategoryList?.Select(w => Category.CreateEntity(w))));
        return new PaginationResult<Product>
        {
            Items = list,
            TotalCount = totalProductsCount,
            PageNumber = page,
            PageSize = limit
        };
    }

    public async Task<Product?> GetProductById(Guid productId)
    {
        Product? Product = await _appDbContext.Products.Include(a => a.CategoryList).Where(e => e.ProductId == productId).SingleOrDefaultAsync();

        return Product;


    }

    public async Task<Product> CreateProduct(ProductModel newProduct)
    {
        Product product = new Product
        {
            Name = newProduct.Name,
            Price = newProduct.Price,
            Stock = newProduct.Stock,
            Description = newProduct.Description,
        };

        await _appDbContext.Products.AddAsync(product);
        await _appDbContext.SaveChangesAsync();

        return await Task.FromResult(product);
    }

    public async Task<Product?> UpdateProduct(Guid productId, ProductModel updateProduct)
    {
        Product? p = await GetProductById(productId);
        if (p is null) return null;

        p.Name = updateProduct.Name;
        p.Price = updateProduct.Price;
        p.Stock = updateProduct.Stock;
        p.Description = updateProduct.Description;

        await _appDbContext.SaveChangesAsync();
        return await Task.FromResult(p);
    }

    public async Task<bool> DeleteProduct(Guid productId)
    {
        var productToDelete = await GetProductById(productId);
        if (productToDelete is null) return await Task.FromResult(false);

        _appDbContext.Products.Remove(productToDelete);
        await _appDbContext.SaveChangesAsync();

        return await Task.FromResult(true);
    }
}