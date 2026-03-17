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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('booking_id');
            $table->string('license_plate');
            $table->string('vehicle_name');
            $table->string('vehicle_owner');
            $table->string('mechanic_name');
            $table->string('mechanic_license');
            $table->string('mechanic_phone');
            $table->string('mechanic_location');
            $table->string('request_date');
            $table->string('issue_description');
            $table->string('status');
            $table->string('payment_status');
            $table->string('paid_date')->nullable(); // Original was decimal? Changing to string or nullable decimal if needed.
            $table->decimal('charges', 10, 2)->nullable();
            $table->string('payment_receipt')->nullable();
            $table->timestamps();

            $table->foreign('booking_id')->references('id')->on('bookings')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
