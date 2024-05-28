

namespace Store.EntityFramework.Entities;

public class ProductCategory
{

    public Guid ProductCategoryId { get; set; }


    public Guid CategoryId { get; set; }//category_id
    public Guid ProductId { get; set; }//product_id

    public required Product Product { get; set; }
    public required Category Category { get; set; }


    public static ProductCategory Create(ProductCategory p, Product Product, Category Category)
    {
        return new ProductCategory
        {
            ProductCategoryId = p.ProductCategoryId,
            CategoryId = p.CategoryId,

            ProductId = p.ProductId,
            Product = Product,
            Category = Category
        };
    }

}