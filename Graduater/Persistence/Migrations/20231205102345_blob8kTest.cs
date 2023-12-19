using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class blob8kTest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Data",
                table: "EFLargeBlobChunks",
                type: "varbinary(8000)",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(10000)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Data",
                table: "EFLargeBlobChunks",
                type: "varbinary(10000)",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(8000)");
        }
    }
}
