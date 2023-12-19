﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class bissiGroesser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Data",
                table: "EFLargeBlobChunks",
                type: "varbinary(50000)",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(6000)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Data",
                table: "EFLargeBlobChunks",
                type: "varbinary(6000)",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(50000)");
        }
    }
}
