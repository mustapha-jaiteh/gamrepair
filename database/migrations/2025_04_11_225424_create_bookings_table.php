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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('vehicle_name');
            $table->string('license_plate');
            $table->string('vehicle_owner');
            $table->string('email');
            $table->string('phone');
            $table->string('city');
            $table->text('issue_description');
            $table->date('date');

            // From add_mechanic_fields_to_bookings_table
            $table->string('mechanic_license')->nullable();
            $table->string('mechanic_name')->nullable();
            $table->boolean('assigned')->default(false);

            $table->timestamps();

            // Note: references license_plate on users. 
            // Ensure users table has license_plate before this migration runs or handle it carefully.
            // Since this migration is dated 2025, and users is 0001, it should be fine.
            $table->foreign('license_plate')->references('license_plate')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
