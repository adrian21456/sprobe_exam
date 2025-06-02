<?php

namespace Database\Factories;

use App\Models\Demo;
use Illuminate\Database\Eloquent\Factories\Factory;

class DemoFactory extends Factory
{
    protected $model = Demo::class;

    public function definition(): array
    {
        return [
            'demo_name' => $this->faker->word(),
            'description' => $this->faker->paragraph(2),
            'status' => $this->faker->randomElement(["active", "inactive"])
        ];
    }
}
