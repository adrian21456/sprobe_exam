<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Employee;
use App\Models\Family;
use App\Models\File;
use App\Models\User;
use Database\Factories\FamilyFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password'
        ]);

        File::factory()->count(10)->create();
        Employee::factory()->count(50)->create();
        Department::factory()->count(10)->create();
        Family::factory()->count(10)->create();

    }
}
