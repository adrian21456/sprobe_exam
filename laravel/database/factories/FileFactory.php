<?php

namespace Database\Factories;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\Factory;

class FileFactory extends Factory
{
    protected $model = File::class;

    public function definition()
    {
        return [
            'file_name' => $this->faker->words(3, true), // e.g. "example file name"
            'file_description' => $this->faker->sentence(), // e.g. "This is a test file."
        ];
    }
}
