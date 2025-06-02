<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Department;


class EmployeeFactory extends Factory
{
    protected $model = Employee::class;

    public function definition(): array
    {
        return [
            'department_id' => Department::factory(),
            'firstname' => $this->faker->firstName,
            'middlename' => $this->faker->optional()->firstName,
            'lastname' => $this->faker->lastName,
            'birthdate' => $this->faker->date('Y-m-d', now()->subYears(18)), // ensures at least 18 years old
            'address' => $this->faker->address,
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
