using System.ComponentModel.DataAnnotations.Schema;
using Store.Models;
namespace Store.EntityFramework.Entities;

[Table("Product")]
public class Product
{
    public Guid ProductId { get; set; }
    public required string Name { get; set; }
    public required Decimal Price { get; set; }
    public required int Stock { get; set; }
    public string? Description { get; set; }

    // public List<Category>? CategoryEntityList { get; set; }
    public IEnumerable<Category>? CategoryList { get; set; }
    public IEnumerable<ProductCategory>? ProductCategoryList { get; set; }

    public static Product Create(Product p, IEnumerable<Category>? CategoryList = null, IEnumerable<ProductCategory>? ProductCategoryList = null)
    {
        return new Product
        {
            ProductId = p.ProductId,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            Stock = p.Stock,
            CategoryList = CategoryList,
            ProductCategoryList = ProductCategoryList
        };
    }
}
