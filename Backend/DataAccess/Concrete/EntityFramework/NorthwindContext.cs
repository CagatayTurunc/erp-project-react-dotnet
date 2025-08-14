using Core.Entities;
using Core.Entities.Concrete;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{
    public class NorthwindContext : DbContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        // DbContext, tüm ayarlarını DI üzerinden bu constructor ile alır.
        public NorthwindContext(DbContextOptions<NorthwindContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        // OnConfiguring metodunu buradan tamamen kaldırdık.

        public DbSet<User> Users { get; set; }
        public DbSet<UserOperationClaim> UserOperationClaims { get; set; }
        public DbSet<Core.Entities.Concrete.OperationClaim> OperationClaims { get; set; }
        public DbSet<SalesOrder> SalesOrders { get; set; }
        public DbSet<SalesOrderLineItem> SalesOrderLineItems { get; set; }
        public DbSet<Quote> Quotes { get; set; }
        public DbSet<QuoteLineItem> QuoteLineItems { get; set; }
        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Decimal alanlar için hassasiyet ayarları
            modelBuilder.Entity<SalesOrder>(entity =>
            {
                entity.Property(e => e.Quantity).HasPrecision(18, 2);
                entity.Property(e => e.PendingQuantity).HasPrecision(18, 2);
                entity.Property(e => e.BillableQuantity).HasPrecision(18, 2);
                entity.Property(e => e.ShippedQuantity).HasPrecision(18, 2);
                entity.Property(e => e.UnitPrice).HasPrecision(18, 2);
                entity.Property(e => e.TotalAmount).HasPrecision(18, 2);
                entity.Property(e => e.ProspectAmount).HasPrecision(18, 2);
            });
        }

        private void SetAuditProperties()
        {
            var entries = ChangeTracker.Entries<IAuditableEntity>();
            var userIdString = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var currentUserId = string.IsNullOrEmpty(userIdString) ? 0 : int.Parse(userIdString);

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedDate = DateTime.Now;
                    entry.Entity.CreatedByUserId = currentUserId;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.ModifiedDate = DateTime.Now;
                    entry.Entity.ModifiedByUserId = currentUserId;
                }
            }
        }

        public override int SaveChanges()
        {
            SetAuditProperties();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            SetAuditProperties();
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}