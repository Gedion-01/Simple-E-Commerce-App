<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        \Log::info('Seeding roles...');
        $roles = [
            ['name' => 'admin'],
            ['name' => 'vendor'],
            ['name' => 'customer'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
        \Log::info('Roles seeded successfully.');
    }
}
