using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class courseUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InstructorId",
                table: "Courses");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "InstructorId",
                table: "Courses",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("78901234-5678-9012-3456-789012345678"),
                column: "CreatedAt",
                value: new DateTime(2025, 12, 10, 14, 11, 4, 834, DateTimeKind.Utc).AddTicks(7639));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("90123456-7890-1234-5678-901234567890"),
                column: "CreatedAt",
                value: new DateTime(2025, 12, 10, 14, 11, 4, 834, DateTimeKind.Utc).AddTicks(7636));
        }
    }
}
