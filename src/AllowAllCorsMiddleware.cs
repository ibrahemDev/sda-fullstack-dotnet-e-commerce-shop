namespace Store.Middleware;
public class AllowAllCorsMiddleware
{
    private readonly RequestDelegate _next;

    public AllowAllCorsMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        context.Response.Headers.Add("Access-Control-Allow-Headers", "*");
        context.Response.Headers.Add("Access-Control-Allow-Methods", "*");

        await _next(context);
    }
}
