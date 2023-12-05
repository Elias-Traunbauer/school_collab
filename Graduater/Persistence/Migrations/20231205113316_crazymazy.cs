using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class crazymazy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_EFLargeBlobChunks_EFLargeBlobId",
                table: "EFLargeBlobChunks",
                column: "EFLargeBlobId");

            migrationBuilder.AddForeignKey(
                name: "FK_EFLargeBlobChunks_EFLargeBlobs_EFLargeBlobId",
                table: "EFLargeBlobChunks",
                column: "EFLargeBlobId",
                principalTable: "EFLargeBlobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EFLargeBlobChunks_EFLargeBlobs_EFLargeBlobId",
                table: "EFLargeBlobChunks");

            migrationBuilder.DropIndex(
                name: "IX_EFLargeBlobChunks_EFLargeBlobId",
                table: "EFLargeBlobChunks");
        }
    }
}
