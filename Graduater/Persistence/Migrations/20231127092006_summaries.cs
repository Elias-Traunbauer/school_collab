using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class summaries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SummaryId",
                table: "Reports",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Downloads",
                table: "Files",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "Files",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "UploadedAt",
                table: "Files",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "Summaries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: false),
                    Content = table.Column<string>(type: "longtext", nullable: false),
                    Version = table.Column<Guid>(type: "char(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Summaries", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_SummaryId",
                table: "Reports",
                column: "SummaryId");

            migrationBuilder.CreateIndex(
                name: "IX_Files_OwnerId",
                table: "Files",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Summaries_OwnerId",
                table: "Files",
                column: "OwnerId",
                principalTable: "Summaries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Summaries_SummaryId",
                table: "Reports",
                column: "SummaryId",
                principalTable: "Summaries",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Summaries_OwnerId",
                table: "Files");

            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Summaries_SummaryId",
                table: "Reports");

            migrationBuilder.DropTable(
                name: "Summaries");

            migrationBuilder.DropIndex(
                name: "IX_Reports_SummaryId",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_Files_OwnerId",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "SummaryId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "Downloads",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "UploadedAt",
                table: "Files");
        }
    }
}
