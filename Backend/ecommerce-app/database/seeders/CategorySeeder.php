<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        \Log::info('Seeding categories...');
        $categories = [
            ['name' => 'Electronics'],
            ['name' => 'Clothing'],
            ['name' => 'Home & Kitchen'],
            ['name' => 'Books'],
            ['name' => 'Sports & Outdoors'],
            ['name' => 'Beauty & Personal Care'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
        \Log::info('Categories seeded successfully.');
    }
}
