<?php

namespace Database\Factories;

use App\Models\Service;
use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $booking = Booking::inRandomOrder()->first() ?? Booking::factory()->create();

        return [
            'booking_id' => $booking->id,
            'license_plate' => $booking->license_plate,
            'vehicle_name' => $booking->vehicle_name,
            'vehicle_owner' => $booking->vehicle_owner,
            'mechanic_name' => $booking->mechanic_name,
            'mechanic_license' => $booking->mechanic_license,
            'mechanic_phone' => fake()->phoneNumber(),
            'mechanic_location' => fake()->address(),
            'request_date' => $booking->date,
            'issue_description' => $booking->issue_description,
            'status' => fake()->randomElement(['pending', 'in-progress', 'completed']),
        ];
    }
}
