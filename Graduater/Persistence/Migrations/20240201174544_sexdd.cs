using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class sexdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignmentFileId",
                table: "Reports",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PollVoteId",
                table: "Reports",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Version",
                table: "AssignmentFiles",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "PollVotes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    PollOptionId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false),
                    Version = table.Column<Guid>(type: "char(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PollVotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PollVotes_PollOptions_PollOptionId",
                        column: x => x.PollOptionId,
                        principalTable: "PollOptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PollVotes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_AssignmentFileId",
                table: "Reports",
                column: "AssignmentFileId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_PollVoteId",
                table: "Reports",
                column: "PollVoteId");

            migrationBuilder.CreateIndex(
                name: "IX_PollVotes_PollOptionId",
                table: "PollVotes",
                column: "PollOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_PollVotes_UserId",
                table: "PollVotes",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_AssignmentFiles_AssignmentFileId",
                table: "Reports",
                column: "AssignmentFileId",
                principalTable: "AssignmentFiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_PollVotes_PollVoteId",
                table: "Reports",
                column: "PollVoteId",
                principalTable: "PollVotes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_AssignmentFiles_AssignmentFileId",
                table: "Reports");

            migrationBuilder.DropForeignKey(
                name: "FK_Reports_PollVotes_PollVoteId",
                table: "Reports");

            migrationBuilder.DropTable(
                name: "PollVotes");

            migrationBuilder.DropIndex(
                name: "IX_Reports_AssignmentFileId",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_Reports_PollVoteId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "AssignmentFileId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "PollVoteId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "Version",
                table: "AssignmentFiles");
        }
    }
}
