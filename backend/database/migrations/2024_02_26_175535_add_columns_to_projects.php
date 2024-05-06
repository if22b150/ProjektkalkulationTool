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
        Schema::table('projects', function (Blueprint $table) {
            $table->string('firstname');
            $table->string('lastname');
            $table->string('email');
            $table->date('start');
            $table->date('end');
            $table->text('notes')->nullable();
            $table->boolean('cross_faculty')->default(false);
            $table->unsignedInteger('participants')->nullable();
            $table->unsignedInteger('duration')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('firstname');
            $table->dropColumn('lastname');
            $table->dropColumn('email');
            $table->dropColumn('start');
            $table->dropColumn('end');
            $table->dropColumn('notes');
            $table->dropColumn('cross_faculty');
            $table->dropColumn('participants');
            $table->dropColumn('duration');
        });
    }
};
