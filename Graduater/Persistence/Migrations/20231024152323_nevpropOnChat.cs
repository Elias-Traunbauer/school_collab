using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class nevpropOnChat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chats_Files_PictureId",
                table: "Chats");

            migrationBuilder.DropIndex(
                name: "IX_Chats_PictureId",
                table: "Chats");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
