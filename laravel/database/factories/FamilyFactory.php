<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Family;
use Illuminate\Database\Eloquent\Factories\Factory;

class FamilyFactory extends Factory
{
    protected $model = Family::class;

    public function definition(): array
    {
        return [
            'employee_id' => Employee::factory(),
            'mother_name' => $this->faker->name('female'),
            'father_name' => $this->faker->name('male'),
            'spouse_name' => $this->faker->name(),
            'children_count' => (string) $this->faker->numberBetween(0, 6),
        ];
    }
}
