using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class chatreplyANDchatpicture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PictureId",
                table: "Chats",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReplyToMessageId",
                table: "ChatMessages",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LastSeenMessageId",
                table: "ChatMembers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Chats_PictureId",
                table: "Chats",
                column: "PictureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Chats_Files_PictureId",
                table: "Chats",
                column: "PictureId",
                principalTable: "Files",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chats_Files_PictureId",
                table: "Chats");

            migrationBuilder.DropIndex(
                name: "IX_Chats_PictureId",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "PictureId",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "ReplyToMessageId",
                table: "ChatMessages");

            migrationBuilder.DropColumn(
                name: "LastSeenMessageId",
                table: "ChatMembers");
        }
    }
}
