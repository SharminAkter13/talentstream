<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resume_id')->constrained('resumes')->onDelete('cascade');
            $table->string('degree')->nullable();
            $table->string('field_of_study')->nullable();
            $table->string('school')->nullable();
            $table->string('edu_from')->nullable();
            $table->string('edu_to')->nullable();
            $table->text('edu_description')->nullable();
            $table->string('edu_logo')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('educations');
    }
};
