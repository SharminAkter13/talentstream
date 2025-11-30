<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1️⃣ Seed roles first
        $this->call(RoleSeeder::class);

        // 2️⃣ Seed a default test user (optional)
        \App\Models\User::factory()->create([
            'name'  => 'Test User',
            'email' => 'testuser@example.com',
            'role_id' => 3, // Assign role if you have role_id
        ]);
    }
}
