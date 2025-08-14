using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ExpandQuoteLineItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CampaignInfo",
                table: "QuoteLineItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "QuoteLineItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "ExchangeRate",
                table: "QuoteLineItems",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "LineNumber",
                table: "QuoteLineItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PackageNumber",
                table: "QuoteLineItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "PackageQuantity",
                table: "QuoteLineItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PackageType",
                table: "QuoteLineItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "SubTotal",
                table: "QuoteLineItems",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "VatType",
                table: "QuoteLineItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CampaignInfo",
                table: "QuoteLineItems");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "QuoteLineItems");

            migrationBuilder.DropColumn(
                name: "ExchangeRate",
                table: "QuoteLineItems");

            migrationBuilder.DropColumn(
                name: "LineNumber",
                table: "QuoteLineItems");

            migrationBuilder.DropColumn(
                name: "PackageNumber",
                table: "QuoteLineItems");

            migrationBuilder.DropColumn(
                name: "PackageQuantity",
                table: "QuoteLineItems");

            migrationBuilder.DropColumn(
                name: "PackageType",
                table: "QuoteLineItems");

            migrationBuilder.DropColumn(
                name: "SubTotal",
                table: "QuoteLineItems");

            migrationBuilder.DropColumn(
                name: "VatType",
                table: "QuoteLineItems");
        }
    }
}
