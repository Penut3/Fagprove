using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CourseHourName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "CourseHours",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("78901234-5678-9012-3456-789012345678"),
                column: "CreatedAt",
                value: new DateTime(2025, 12, 11, 12, 58, 4, 720, DateTimeKind.Utc).AddTicks(5171));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("90123456-7890-1234-5678-901234567890"),
                column: "CreatedAt",
                value: new DateTime(2025, 12, 11, 12, 58, 4, 720, DateTimeKind.Utc).AddTicks(5167));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "CourseHours");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("78901234-5678-9012-3456-789012345678"),
                column: "CreatedAt",
                value: new DateTime(2025, 12, 11, 10, 39, 38, 745, DateTimeKind.Utc).AddTicks(1548));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("90123456-7890-1234-5678-901234567890"),
                column: "CreatedAt",
                value: new DateTime(2025, 12, 11, 10, 39, 38, 745, DateTimeKind.Utc).AddTicks(1544));
        }
    }
}
