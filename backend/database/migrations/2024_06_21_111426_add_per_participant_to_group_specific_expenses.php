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
        Schema::table('group_specific_expenses', function (Blueprint $table) {
            $table->boolean('per_participant')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('group_specific_expenses', function (Blueprint $table) {
            $table->dropColumn('per_participant');
        });
    }
};
