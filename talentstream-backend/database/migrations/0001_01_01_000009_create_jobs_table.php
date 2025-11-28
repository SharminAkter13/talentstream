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
        Schema::create('jobs', function (Blueprint $table) {
            
            // Primary Key
            $table->id();

            // Foreign Keys (INT in diagram, using foreignId for BigInt unsigned consistency)
            // Assumed that the foreign tables (employers, companies, etc.) are already created.
            $table->foreignId('employer_id')->constrained('employers')->onDelete('cascade');
            $table->foreignId('company_id')->constrained('companies')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('job_type_id')->constrained('job_types')->onDelete('cascade');
            $table->foreignId('job_skill_id')->constrained('job_skills')->onDelete('cascade');
            $table->foreignId('job_location_id')->constrained('job_locations')->onDelete('cascade');
            
            // Textual Fields
            $table->string('title', 255);
            $table->text('description');

            // Salary Fields (DECIMAL(10, 2))
            $table->decimal('salary_min', 10, 2)->nullable();
            $table->decimal('salary_max', 10, 2)->nullable();

            // Date & Time Fields (DATETIME)
            $table->dateTime('posted_date');
            $table->dateTime('application_deadline')->nullable(); // Deadline might be null

            // Numerical Field
            $table->integer('num_vacancies')->default(1); 

            // Status Field (ENUM and Not Null 'NN')
            $table->enum('status', ['active', 'expired', 'closed'])->default('active'); 

            // Timestamps (created_at, updated_at)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};