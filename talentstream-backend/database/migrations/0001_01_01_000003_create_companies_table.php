<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
            Schema::create('companies', function (Blueprint $table)
            {
            $table->id();
            $table->string('name')->unique();
            $table->string('industry')->nullable();
            $table->text('description')->nullable();
            $table->string('website')->nullable();
            $table->string('address')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone', 50)->nullable();
            $table->string('logo')->nullable();
            $table->integer('established_year')->nullable();
            $table->string('size', 50)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
