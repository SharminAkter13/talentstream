<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * This method adds the column.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Adds the 'api_token' column
            // VARCHAR(60), must be unique, and can be NULL initially
            $table->string('api_token', 60)->unique()->nullable()->after('password');
        });
    }

    /**
     * Reverse the migrations.
     * This method removes the column.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drops the 'api_token' column
            $table->dropColumn('api_token');
        });
    }
};