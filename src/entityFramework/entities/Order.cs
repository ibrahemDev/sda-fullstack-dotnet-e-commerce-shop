using System.ComponentModel.DataAnnotations.Schema;

namespace Store.EntityFramework.Entities;

[Table("Order")]
public class Order
{
    // ? needs discussion
    // public enum OrderStatus
    // {
    //     Pending,
    //     Processing,
    //     Shipped,
    //     Completed,
    //     Cancelled
    // }

    public Guid OrderId { get; set; }
    public required Guid UserId { get; set; }
    public Guid? AddressId { get; set; }
    public Guid? PaymentMethodId { get; set; }
    public Guid? TransactionId { get; set; }
    public Guid? ShipmentId { get; set; }

    public required int Status { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    public virtual User? User { get; set; }
    public virtual Address? Address { get; set; }
    public virtual PaymentMethod? PaymentMethod { get; set; }
    public virtual List<OrderItem>? Items { get; set; } = [];
}