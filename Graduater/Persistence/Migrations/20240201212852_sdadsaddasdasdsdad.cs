using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class sdadsaddasdasdsdad : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssignmentFiles_Assignments_AssignmentId",
                table: "AssignmentFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_AssignmentFiles_Assignments_AssignmentIdInstruction",
                table: "AssignmentFiles");

            migrationBuilder.DropIndex(
                name: "IX_AssignmentFiles_AssignmentIdInstruction",
                table: "AssignmentFiles");

            migrationBuilder.DropColumn(
                name: "AssignmentIdInstruction",
                table: "AssignmentFiles");

            migrationBuilder.AlterColumn<int>(
                name: "AssignmentId",
                table: "AssignmentFiles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Instruction",
                table: "AssignmentFiles",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_AssignmentFiles_Assignments_AssignmentId",
                table: "AssignmentFiles",
                column: "AssignmentId",
                principalTable: "Assignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssignmentFiles_Assignments_AssignmentId",
                table: "AssignmentFiles");

            migrationBuilder.DropColumn(
                name: "Instruction",
                table: "AssignmentFiles");

            migrationBuilder.AlterColumn<int>(
                name: "AssignmentId",
                table: "AssignmentFiles",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "AssignmentIdInstruction",
                table: "AssignmentFiles",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AssignmentFiles_AssignmentIdInstruction",
                table: "AssignmentFiles",
                column: "AssignmentIdInstruction");

            migrationBuilder.AddForeignKey(
                name: "FK_AssignmentFiles_Assignments_AssignmentId",
                table: "AssignmentFiles",
                column: "AssignmentId",
                principalTable: "Assignments",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AssignmentFiles_Assignments_AssignmentIdInstruction",
                table: "AssignmentFiles",
                column: "AssignmentIdInstruction",
                principalTable: "Assignments",
                principalColumn: "Id");
        }
    }
}
