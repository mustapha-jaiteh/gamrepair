<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin user in admins table
        \App\Models\Admin::updateOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'Admin User', 'password' => \Illuminate\Support\Facades\Hash::make('password')]
        );

        // 10 Users
        \App\Models\User::factory(10)->create();

        // 10 Mechanics
        \App\Models\Mechanic::factory(10)->create();

        // 20 Bookings
        \App\Models\Booking::factory(20)->create();

        // 20 Services
        \App\Models\Service::factory(20)->create();
    }
}
