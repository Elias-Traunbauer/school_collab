using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class sexdddsaasddsa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Summaries_OwnerId",
                table: "Files");

            migrationBuilder.DropIndex(
                name: "IX_Files_OwnerId",
                table: "Files");

            migrationBuilder.AddColumn<int>(
                name: "SummaryFileId",
                table: "Reports",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SummaryFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    SummaryId = table.Column<int>(type: "int", nullable: false),
                    FileId = table.Column<int>(type: "int", nullable: false),
                    Instruction = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    OwnerId = table.Column<int>(type: "int", nullable: true),
                    Version = table.Column<Guid>(type: "char(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SummaryFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SummaryFiles_Files_FileId",
                        column: x => x.FileId,
                        principalTable: "Files",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SummaryFiles_Summaries_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Summaries",
                        principalColumn: "Id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_SummaryFileId",
                table: "Reports",
                column: "SummaryFileId");

            migrationBuilder.CreateIndex(
                name: "IX_SummaryFiles_FileId",
                table: "SummaryFiles",
                column: "FileId");

            migrationBuilder.CreateIndex(
                name: "IX_SummaryFiles_OwnerId",
                table: "SummaryFiles",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_SummaryFiles_SummaryFileId",
                table: "Reports",
                column: "SummaryFileId",
                principalTable: "SummaryFiles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_SummaryFiles_SummaryFileId",
                table: "Reports");

            migrationBuilder.DropTable(
                name: "SummaryFiles");

            migrationBuilder.DropIndex(
                name: "IX_Reports_SummaryFileId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "SummaryFileId",
                table: "Reports");

            migrationBuilder.CreateIndex(
                name: "IX_Files_OwnerId",
                table: "Files",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Summaries_OwnerId",
                table: "Files",
                column: "OwnerId",
                principalTable: "Summaries",
                principalColumn: "Id");
        }
    }
}
