<?php

namespace Database\Factories;

use App\Models\Mechanic;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends Factory<Mechanic>
 */
class MechanicFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'role' => 'mechanic',
            'phone' => fake()->phoneNumber(),
            'street_address' => fake()->streetAddress(),
            'city' => fake()->city(),
            'region' => fake()->state(),
            'mechanic_license' => 'MECH-' . fake()->unique()->numerify('#####'),
            'years_of_experience' => fake()->numberBetween(1, 20) . ' years',
            'specialization' => fake()->randomElement(['Engine', 'Brakes', 'Transmission', 'Electrical', 'Suspension']),
            'username' => fake()->unique()->userName(),
            'password' => Hash::make('password'),
            'profile_image' => 'mechanic_profiles/default.png',
        ];
    }
}
