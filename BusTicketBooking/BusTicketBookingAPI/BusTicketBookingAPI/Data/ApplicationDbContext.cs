using BusTicketBookingAPI.Models;
using Microsoft.EntityFrameworkCore;


namespace BusTicketBookingAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User>? Users { get; set; }
    }
}
