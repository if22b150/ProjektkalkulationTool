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
        Schema::create('project_faculty', function (Blueprint $table) {
            $table->timestamps();

            $table->primary(['project_id', 'faculty_id']);

            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('faculty_id');

            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->foreign('faculty_id')->references('id')->on('faculties')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_faculty');
    }
};
