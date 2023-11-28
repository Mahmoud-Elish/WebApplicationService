using Microsoft.EntityFrameworkCore;
using QuickDataApi.PL;

var builder = WebApplication.CreateBuilder(args);

#region Default
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

#endregion

#region DbContext
builder.Services.AddDbContext<DBContext>(option =>
                option.UseSqlServer(builder.Configuration.GetConnectionString("QuickDb")));
#endregion 

#region InjectionForRepositories
builder.Services.AddScoped<IRecordRepo, RecordRepo>();
#endregion


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseStaticFiles();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
