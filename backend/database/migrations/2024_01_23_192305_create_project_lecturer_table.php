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
        Schema::create('project_lecturer', function (Blueprint $table) {
            $table->timestamps();
            $table->primary(['project_id', 'lecturer_id']);

            $table->integer('hours');
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('lecturer_id');

            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->foreign('lecturer_id')->references('id')->on('lecturers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_lecturer');
    }
};
