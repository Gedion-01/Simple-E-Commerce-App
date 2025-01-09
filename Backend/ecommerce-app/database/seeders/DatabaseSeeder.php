<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
     public function run()
    {
        \Log::info('Running DatabaseSeeder...');
        $this->call([
            RoleSeeder::class,
            CategorySeeder::class,
        ]);
        \Log::info('Database seeding completed.');
    }
} 
