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
            $table->enum('state', \App\Enums\EProjectState::values())->default(\App\Enums\EProjectState::SUBMITTED);
            $table->timestamp('state_changed_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('state');
            $table->dropColumn('state_changed_at');
        });
    }
};
