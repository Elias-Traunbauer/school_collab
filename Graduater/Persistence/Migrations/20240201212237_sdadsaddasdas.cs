using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class sdadsaddasdas : Migration
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

            migrationBuilder.AlterColumn<int>(
                name: "AssignmentIdInstruction",
                table: "AssignmentFiles",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "AssignmentId",
                table: "AssignmentFiles",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssignmentFiles_Assignments_AssignmentId",
                table: "AssignmentFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_AssignmentFiles_Assignments_AssignmentIdInstruction",
                table: "AssignmentFiles");

            migrationBuilder.AlterColumn<int>(
                name: "AssignmentIdInstruction",
                table: "AssignmentFiles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AssignmentId",
                table: "AssignmentFiles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AssignmentFiles_Assignments_AssignmentId",
                table: "AssignmentFiles",
                column: "AssignmentId",
                principalTable: "Assignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AssignmentFiles_Assignments_AssignmentIdInstruction",
                table: "AssignmentFiles",
                column: "AssignmentIdInstruction",
                principalTable: "Assignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
