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
        Schema::table('project_lecturer', function (Blueprint $table) {
            $table->integer('hourly_rate_override')->nullable();
            $table->integer('daily_rate_override')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_lecturer', function (Blueprint $table) {
            $table->dropColumn('hourly_rate_override');
            $table->dropColumn('daily_rate_override');
        });
    }
};
