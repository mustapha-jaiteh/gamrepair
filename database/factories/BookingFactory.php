<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\User;
use App\Models\Mechanic;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::where('role', 'user')->whereNotNull('license_plate')->inRandomOrder()->first() ?? User::factory()->create(['role' => 'user']);
        $mechanic = Mechanic::inRandomOrder()->first() ?? Mechanic::factory()->create();

        return [
            'vehicle_name' => fake()->randomElement(['Toyota Corolla', 'Honda Civic', 'Ford F-150', 'BMW 3 Series', 'Mercedes-Benz C-Class']),
            'license_plate' => $user->license_plate,
            'vehicle_owner' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'city' => $user->city,
            'issue_description' => fake()->paragraph(),
            'date' => fake()->dateTimeBetween('-1 month', '+1 month')->format('Y-m-d'),
            'mechanic_license' => $mechanic->mechanic_license,
            'mechanic_name' => $mechanic->name,
            'assigned' => true,
        ];
    }
}
