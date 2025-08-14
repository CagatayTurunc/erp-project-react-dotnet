using Bogus;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using Entities.Concrete.Enums;
using System.Collections.Generic;
using System.Linq;

namespace WebApi.Data
{
    public static class Seed
    {
        public static void SeedData(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<NorthwindContext>();

                // --- 1. Müşterileri (Customers) Tohumlama ---
                // Önce Müşteriler oluşturulur ve kaydedilir ki diğer tablolarda kullanılabilsin.
                if (!context.Customers.Any())
                {
                    Console.WriteLine("Customer veritabanı boş. Popüler isimlerle sahte müşteriler ekleniyor...");

                    var popularFirstNames = new[] { "Ahmet", "Mehmet", "Mustafa", "Ali", "Hüseyin", "Ayşe", "Fatma", "Zeynep", "Emine", "Hatice", "Yusuf", "Ecrin", "Yağmur", "Elif" };
                    var popularLastNames = new[] { "Yılmaz", "Kaya", "Demir", "Çelik", "Şahin", "Yıldız", "Öztürk", "Aydın", "Özdemir", "Arslan" };

                    var customerFaker = new Faker<Customer>("tr")
                        .RuleFor(c => c.FirstName, f => f.PickRandom(popularFirstNames))
                        .RuleFor(c => c.LastName, f => f.PickRandom(popularLastNames))
                        .RuleFor(c => c.CustomerCode, (f, c) => $"CUST-{f.Random.Int(1000, 9999)}")
                        .RuleFor(c => c.CompanyName, (f, c) => $"{c.FirstName} {c.LastName} Ticaret");

                    var fakeCustomers = customerFaker.Generate(20);
                    context.Customers.AddRange(fakeCustomers);
                    context.SaveChanges(); // Müşterileri, diğer tablolarda kullanmadan önce veritabanına kaydediyoruz.
                    Console.WriteLine($"{fakeCustomers.Count} adet sahte müşteri eklendi.");
                }

                // --- 2. Satış Siparişlerini (SalesOrders) Tohumlama ---
                if (!context.SalesOrders.Any())
                {
                    Console.WriteLine("SalesOrder veritabanı boş. Sahte veriler ekleniyor...");

                    var customerIds = context.Customers.Select(c => c.Id).ToList();

                    var orderFaker = new Faker<SalesOrder>("tr")
                        .RuleFor(o => o.OrderNumber, f => $"SO-{f.Random.AlphaNumeric(6).ToUpper()}")
                        .RuleFor(o => o.CustomerId, f => f.PickRandom(customerIds)) // Gerçek müşteri ID'lerinden seç
                        .RuleFor(o => o.ProductId, f => f.Random.Int(1, 100))
                        .RuleFor(o => o.OrderDate, f => f.Date.Past(2, DateTime.Now.AddDays(-1)))
                        .RuleFor(o => o.ValidUntil, (f, o) => o.OrderDate.AddDays(f.Random.Int(15, 60)))
                        .RuleFor(o => o.ProspectAmount, f => f.Finance.Amount(500, 25000))
                        .RuleFor(o => o.Status, f => f.PickRandom<SalesOrderStatus>())
                        .RuleFor(o => o.CreatedDate, (f, o) => o.OrderDate)
                        .RuleFor(o => o.CreatedByUserId, 1)
                        .RuleFor(o => o.MHT, f => f.PickRandom(new string[] { "M", "H", "T" }))
                        .RuleFor(o => o.Type, "Alınan")
                        .RuleFor(o => o.Quantity, f => f.Random.Decimal(1, 100))
                        .RuleFor(o => o.Unit, "AD")
                        .RuleFor(o => o.IsCompleted, f => f.Random.Bool())
                        .RuleFor(o => o.PendingQuantity, (f, o) => o.IsCompleted ? 0 : o.Quantity)
                        .RuleFor(o => o.BillableQuantity, (f, o) => o.Quantity)
                        .RuleFor(o => o.ShippedQuantity, (f, o) => o.Quantity)
                        .RuleFor(o => o.LotNumber, f => f.Commerce.Ean8())
                        .RuleFor(o => o.UnitPrice, f => f.Finance.Amount(10, 250))
                        .RuleFor(o => o.Currency, "TRY")
                        .RuleFor(o => o.TotalAmount, (f, o) => o.Quantity * o.UnitPrice);

                    var fakeOrders = orderFaker.Generate(200);
                    context.SalesOrders.AddRange(fakeOrders);
                    Console.WriteLine("200 adet sahte SalesOrder verisi eklendi.");
                }

                // --- 3. Teklifleri (Quotes) ve Satırlarını Tohumlama ---
                if (!context.Quotes.Any())
                {
                    Console.WriteLine("Quote veritabanı boş. Sahte Teklifler ve Satırları ekleniyor...");

                    var customerIds = context.Customers.Select(c => c.Id).ToList();

                    var lineItemFaker = new Faker<QuoteLineItem>("tr")
                        .RuleFor(li => li.ProductId, f => f.Random.Int(1, 100))
                        .RuleFor(li => li.Type, "Malzeme")
                        .RuleFor(li => li.Description, f => f.Commerce.ProductName())
                        .RuleFor(li => li.Quantity, f => f.Random.Decimal(1, 20))
                        .RuleFor(li => li.Unit, "AD")
                        .RuleFor(li => li.UnitPrice, f => f.Finance.Amount(10, 500))
                        .RuleFor(li => li.VatRate, 20.00m)
                        .RuleFor(li => li.TotalAmount, (f, li) => li.Quantity * li.UnitPrice)
                        .RuleFor(li => li.VatType, "Hariç")
                        .RuleFor(li => li.Currency, "TRY")
                        .RuleFor(li => li.ExchangeRate, 1.0m)
                        .RuleFor(li => li.SubTotal, (f, li) => li.TotalAmount)
                        .RuleFor(li => li.PackageNumber, f => f.Commerce.Ean8())
                        .RuleFor(li => li.PackageQuantity, f => f.Random.Int(1, 5))
                        .RuleFor(li => li.PackageType, "-")
                        .RuleFor(li => li.LineNumber, f => f.IndexFaker + 1)
                        .RuleFor(li => li.CampaignInfo, "");

                    var quoteFaker = new Faker<Quote>("tr")
                        .RuleFor(q => q.DocumentType, "T")
                        .RuleFor(q => q.QuoteDate, f => f.Date.Past(1, DateTime.Now))
                        .RuleFor(q => q.DocumentNumber, f => $"QUO-{f.Random.AlphaNumeric(6).ToUpper()}")
                        .RuleFor(q => q.CustomerId, f => f.PickRandom(customerIds))
                        .RuleFor(q => q.ApprovalStatus, f => f.PickRandom(new string[] { "Onay Bekliyor", "Onaylandı", "Reddedildi" }))
                        .RuleFor(q => q.OrderStatus, "Sipariş Yok")
                        .RuleFor(q => q.InvoiceStatus, "Fatura Edilmedi")
                        .RuleFor(q => q.Description, f => f.Lorem.Sentence(5))
                        .RuleFor(q => q.CreatedDate, (f, q) => q.QuoteDate)
                        .RuleFor(q => q.CreatedByUserId, 1)
                        .FinishWith((f, q) =>
                        {
                            q.LineItems = lineItemFaker.Generate(f.Random.Int(2, 5));
                            q.GrandTotal = q.LineItems.Sum(li => li.TotalAmount);
                        });

                    var fakeQuotes = quoteFaker.Generate(150);
                    context.Quotes.AddRange(fakeQuotes);
                    Console.WriteLine("150 adet sahte Quote ve ilişkili satırları eklendi.");
                }

                // Tüm yeni eklenen verileri tek seferde veritabanına kaydet
                context.SaveChanges();
            }
        }
    }
}
