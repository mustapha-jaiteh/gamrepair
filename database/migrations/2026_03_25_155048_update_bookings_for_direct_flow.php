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
        Schema::table('bookings', function (Blueprint $table) {
            // Drop existing foreign key on license_plate
            $table->dropForeign(['license_plate']);

            // Add new nullable user and mechanic relationships
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete()->after('id');
            $table->foreignId('mechanic_id')->nullable()->constrained('mechanics')->nullOnDelete()->after('date');

            // Add status string to track the request -> service lifecycle
            $table->string('status')->default('pending')->after('mechanic_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['mechanic_id']);
            $table->dropColumn(['user_id', 'mechanic_id', 'status']);
            $table->foreign('license_plate')->references('license_plate')->on('users')->onDelete('cascade');
        });
    }
};
