<?php

namespace Database\Factories;

use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;

class DepartmentFactory extends Factory
{
    protected $model = Department::class;

    public function definition(): array
    {
        return [
            'department_name'   => $this->faker->company,
            'department_head'   => $this->faker->name,
            'designation_name'  => $this->faker->jobTitle,
        ];
    }
}
