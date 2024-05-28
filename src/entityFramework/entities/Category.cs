using Store.Models;

namespace Store.EntityFramework.Entities;

public class Category
{
    public Guid CategoryId { get; set; }

    public required string Name { get; set; }
    public string? Description { get; set; }

    public IEnumerable<Product>? ProductList { get; set; }

    public IEnumerable<ProductCategory>? ProductCategoryList { get; set; }

    public static Category CreateEntity(Category category, IEnumerable<Product>? ProductList = null, IEnumerable<ProductCategory>? ProductCategoryList = null)
    {
        return new Category
        {
            CategoryId = category.CategoryId,
            Name = category.Name,
            Description = category.Description,
            ProductList = ProductList,
            ProductCategoryList = ProductCategoryList
        };
    }


    public static Category Create(CategoryModel categoryModel, IEnumerable<Product>? ProductList = null, IEnumerable<ProductCategory>? ProductCategoryList = null)
    {
        return new Category
        {
            Name = categoryModel.Name,
            Description = categoryModel.Description,
            ProductList = ProductList,
            ProductCategoryList = ProductCategoryList
        };
    }


    public static Category FromModel(CategoryModel category)
    {
        return new Category
        {
            CategoryId = category.CategoryId,
            Name = category.Name,
            Description = category.Description
        };
    }


}
